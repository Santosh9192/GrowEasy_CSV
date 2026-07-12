import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { config } from '../config';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt';
import { fewShotExamples } from '../prompts/fewShotExamples';
import { validateAndCleanRecord } from './crmValidator';
import { CrmRecord, DataSource } from '../types/crm';
import { BatchResult } from '../types/ai';
import { logger } from '../utils/logger';

export class AIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    if (!config.geminiApiKey || config.geminiApiKey === 'your-gemini-api-key-here') {
      logger.warn('GEMINI_API_KEY not set — AI extraction will use mock mode');
    }
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
  }

  async processBatch(
    rows: Record<string, string>[],
    startIndex: number
  ): Promise<BatchResult> {
    const useMock = !config.geminiApiKey || config.geminiApiKey === 'your-gemini-api-key-here';

    if (useMock) {
      logger.info('Using mock AI processor (no valid API key)');
      return this.mockProcessBatch(rows, startIndex);
    }

    try {
      return await this.aiProcessBatch(rows, startIndex);
    } catch (err) {
      logger.warn('AI processing failed, falling back to mock mode:', (err as Error).message);
      return this.mockProcessBatch(rows, startIndex);
    }
  }

  private async aiProcessBatch(
    rows: Record<string, string>[],
    startIndex: number
  ): Promise<BatchResult> {
    const userMessage = `Process these ${rows.length} rows and return a JSON array:\n${JSON.stringify(rows, null, 2)}`;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        const model = this.genAI.getGenerativeModel({
          model: config.aiModel,
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        });

        // Build fresh conversation history for each attempt
        const history: Content[] = [];
        for (const example of fewShotExamples) {
          history.push(
            { role: 'user', parts: [{ text: JSON.stringify(example.input) }] },
            { role: 'model', parts: [{ text: JSON.stringify(example.output) }] }
          );
        }

        const chat = model.startChat({
          systemInstruction: SYSTEM_PROMPT,
          history,
        });

        const result = await chat.sendMessage(userMessage);
        const content = result.response.text();

        if (!content) {
          throw new Error('Empty response from AI');
        }

        // Strip markdown code fences if present
        let cleaned = content.trim();
        if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```$/, '');
        }

        const parsed = JSON.parse(cleaned);
        return this.normalizeResponse(parsed, rows, startIndex);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        logger.warn(`AI batch attempt ${attempt} failed: ${lastError.message}`);

        if (
          lastError.message.toLowerCase().includes('quota') ||
          lastError.message.toLowerCase().includes('insufficient') ||
          lastError.message.toLowerCase().includes('rate limit') ||
          lastError.message.toLowerCase().includes('429') ||
          lastError.message.toLowerCase().includes('too many requests')
        ) {
          break;
        }

        if (attempt < config.maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('AI processing failed after all retries');
  }

  private normalizeResponse(
    parsed: unknown,
    originalRows: Record<string, string>[],
    startIndex: number
  ): BatchResult {
    const results = (
      Array.isArray(parsed)
        ? parsed
        : (parsed as Record<string, unknown>).results ??
          (parsed as Record<string, unknown>).data ??
          []
    ) as unknown[];

    const processed: CrmRecord[] = [];
    const skipped: BatchResult['skipped'] = [];
    const failed: BatchResult['failed'] = [];

    for (let i = 0; i < results.length; i++) {
      const record = results[i] as Record<string, unknown>;
      const globalIndex = startIndex + i;

      if (record.skip) {
        skipped.push({
          rowIndex: globalIndex,
          reason: (record.reason as string) || 'Skipped by AI',
          originalData: originalRows[i] || {},
        });
        continue;
      }

      if (this.isValidPartialRecord(record)) {
        try {
          const cleaned = validateAndCleanRecord(record as Partial<CrmRecord>);
          processed.push(cleaned);
        } catch {
          failed.push({
            rowIndex: globalIndex,
            reason: 'Validation failed',
            raw: record,
          });
        }
      } else {
        failed.push({
          rowIndex: globalIndex,
          reason: 'Invalid structure returned by AI',
          raw: record,
        });
      }
    }

    return { processed, skipped, failed };
  }

  private isValidPartialRecord(record: Record<string, unknown>): boolean {
    const requiredFields = ['name', 'email'];
    return requiredFields.some((field) => typeof record[field] === 'string');
  }

  /**
   * Exhaustively scan all CSV columns to find matching data for each CRM field.
   * Uses multiple keyword patterns per field and falls back to checking ALL column values.
   */
  private mockProcessBatch(
    rows: Record<string, string>[],
    startIndex: number
  ): Promise<BatchResult> {
    const processed: CrmRecord[] = [];
    const skipped: BatchResult['skipped'] = [];
    const failed: BatchResult['failed'] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const globalIndex = startIndex + i;

      const allColumns = Object.keys(row);
      const allValues = Object.values(row);

      const hasEmail = allValues.some(
        (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      );
      const hasPhone = allValues.some(
        (v) => typeof v === 'string' && /\d{7,}/.test(v)
      );

      if (!hasEmail && !hasPhone) {
        skipped.push({
          rowIndex: globalIndex,
          reason: 'No email or mobile found',
          originalData: row,
        });
        continue;
      }

      // --- Exhaustive field extraction from all columns ---

      // 1. Name: check multiple column name patterns
      const nameKey = allColumns.find((k) =>
        /name|full.?name|first.?name|customer|contact.?person|lead.?name/i.test(k)
      );
      const firstNameKey = allColumns.find((k) =>
        /first.?name|fname|given.?name/i.test(k)
      );
      const lastNameKey = allColumns.find((k) =>
        /last.?name|lname|surname|family.?name/i.test(k)
      );
      let fullName = nameKey ? row[nameKey] : '';
      if (!fullName && firstNameKey && lastNameKey) {
        fullName = `${row[firstNameKey]} ${row[lastNameKey]}`.trim();
      }
      if (!fullName && firstNameKey) {
        fullName = row[firstNameKey];
      }

      // 2. Email
      const emailKey = allColumns.find((k) =>
        /email|e-?mail|mail|e-mail/i.test(k)
      );
      const email = emailKey
        ? row[emailKey]
        : allValues.find((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || '';

      // 3. Phone / Mobile
      const phoneKey = allColumns.find((k) =>
        /phone|mobile|contact|telephone|tel|cell|phone.?1/i.test(k)
      );
      const phone = phoneKey ? row[phoneKey] : '';

      let countryCode = '';
      let mobileNumber = phone;

      if (/^\+\d{1,3}/.test(phone)) {
        const match = phone.match(/^(\+\d{1,3})(.*)/);
        if (match) {
          countryCode = match[1];
          mobileNumber = match[2].trim().replace(/^[-.\s]+/, '');
        }
      }

      // 4. Company
      const companyKey = allColumns.find((k) =>
        /company|organization|business|account|firm|customer|client|org/i.test(k)
      );
      const company = companyKey ? row[companyKey] : '';

      // 5. City
      const cityKey = allColumns.find((k) =>
        /city|town|location|locality|district|area|address.?city/i.test(k)
      );
      const city = cityKey ? row[cityKey] : '';

      // 6. State
      const stateKey = allColumns.find((k) =>
        /state|province|region|territory|county/i.test(k)
      );
      const state = stateKey ? row[stateKey] : '';

      // 7. Country
      const countryKey = allColumns.find((k) =>
        /country|nation|territory|country.?name/i.test(k)
      );
      const country = countryKey ? row[countryKey] : '';

      // 8. Lead Owner
      const leadOwnerKey = allColumns.find((k) =>
        /lead.?owner|assigned.?to|sales.?rep|account.?manager|owner|agent|representative/i.test(k)
      );
      const lead_owner = leadOwnerKey ? row[leadOwnerKey] : '';

      // 9. Data Source
      const dataSourceKey = allColumns.find((k) =>
        /lead.?source|source|campaign|channel|medium|referral|lead.?src/i.test(k)
      );
      const data_source = dataSourceKey ? row[dataSourceKey] : '';

      // 10. Possession Time
      const possessionKey = allColumns.find((k) =>
        /possession|move.?in|occupancy|delivery.?date|handover|possession.?time/i.test(k)
      );
      const possession_time = possessionKey ? row[possessionKey] : '';

      // 11. Description / Notes / Comments
      const descriptionKey = allColumns.find((k) =>
        /description|desc|details|summary/i.test(k)
      );
      const notesKey = allColumns.find((k) =>
        /notes?|comments?|remarks?|feedback|note/i.test(k)
      );

      // Collect all "extra" values that haven't been used yet for crm_note
      const usedKeys = new Set([
        nameKey, firstNameKey, lastNameKey, emailKey, phoneKey,
        companyKey, cityKey, stateKey, countryKey, leadOwnerKey,
        dataSourceKey, possessionKey, descriptionKey, notesKey,
      ].filter(Boolean));

      const extraParts: string[] = [];
      for (const key of allColumns) {
        if (!usedKeys.has(key) && row[key] && row[key].trim()) {
          extraParts.push(`${key}: ${row[key]}`);
        }
      }

      const notes = notesKey ? row[notesKey] : '';
      const description = descriptionKey ? row[descriptionKey] : (notesKey !== descriptionKey ? notes : '');

      // Build crm_note from notes + remaining unused columns
      let crm_note = notes;
      if (extraParts.length > 0) {
        const extraNote = extraParts.join('; ');
        if (crm_note) {
          crm_note += ` | ${extraNote}`;
        } else {
          crm_note = extraNote;
        }
      }

      processed.push(
        validateAndCleanRecord({
          created_at: new Date().toISOString(),
          name: fullName,
          email: email,
          country_code: countryCode,
          mobile_without_country_code: mobileNumber,
          company: company,
          city: city,
          state: state,
          country: country,
          lead_owner: lead_owner,
          crm_status: 'GOOD_LEAD_FOLLOW_UP',
          crm_note: crm_note,
          data_source: data_source as DataSource,
          possession_time: possession_time,
          description: description,
          original_data: row,
        })
      );
    }

    return Promise.resolve({ processed, skipped, failed });
  }

  async processAllRows(
    rows: Record<string, string>[]
  ): Promise<BatchResult> {
    const batchSize = config.batchSize;
    const allProcessed: CrmRecord[] = [];
    const allSkipped: BatchResult['skipped'] = [];
    const allFailed: BatchResult['failed'] = [];

    const batches: Record<string, string>[][] = [];
    for (let i = 0; i < rows.length; i += batchSize) {
      batches.push(rows.slice(i, i + batchSize));
    }

    logger.info(`Processing ${rows.length} rows in ${batches.length} batches of ${batchSize}`);

    const concurrencyLimit = config.maxConcurrency;

    for (let i = 0; i < batches.length; i += concurrencyLimit) {
      const slice = batches.slice(i, i + concurrencyLimit);
      const results = await Promise.all(
        slice.map((batch, idx) => this.processBatch(batch, (i + idx) * batchSize))
      );

      for (const result of results) {
        allProcessed.push(...result.processed);
        allSkipped.push(...result.skipped);
        allFailed.push(...result.failed);
      }

      logger.info(
        `Processed batches ${i + 1}-${Math.min(i + concurrencyLimit, batches.length)} of ${batches.length}`
      );
    }

    return {
      processed: allProcessed,
      skipped: allSkipped,
      failed: allFailed,
    };
  }
}
