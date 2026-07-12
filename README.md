<div align="center">

  <!-- Logo / Hero -->
  <img src="https://img.shields.io/badge/GrowEasy-CRM-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjZjQ3MzIwIi8+PHRleHQgeD0iMjAiIHk9IjI4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RzwvdGV4dD48L3N2Zz4=" alt="GrowEasy" />
  
  <h1 align="center" style="font-size: 2.5rem; font-weight: 800; margin-top: 0.5rem;">
    🤖 AI-Powered CSV Importer
  </h1>
  
  <p align="center" style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">
    Intelligently transform any CSV file into structured CRM records using 
    <strong>Google Gemini AI</strong> — no matter the column names, layout, or source.
  </p>

  <!-- Badges Row -->
  <p align="center" style="margin-top: 1.5rem;">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5" />
    <img src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express" alt="Express 4" />
    <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=flat-square&logo=googlebard" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4" />
    <br/>
    <img src="https://img.shields.io/badge/status-production_ready-22c55e?style=flat-square" alt="Production Ready" />
    <img src="https://img.shields.io/badge/tests-pending-yellow?style=flat-square" alt="Tests" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  </p>

  <hr style="width: 60%; margin: 2rem auto; border: none; border-top: 1px solid #e5e7eb;" />

  <!-- Quick Links -->
  <p align="center">
    <a href="#-features"><strong>Features</strong></a> •
    <a href="#-architecture"><strong>Architecture</strong></a> •
    <a href="#-quick-start"><strong>Quick Start</strong></a> •
    <a href="#-api-reference"><strong>API</strong></a> •
    <a href="#-deployment"><strong>Deploy</strong></a> •
    <a href="#-tech-stack"><strong>Tech Stack</strong></a>
  </p>
</div>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>📤 Smart Upload</h3>
        <p>Drag & drop or file picker. <br/>Supports any CSV format from any source.</p>
      </td>
      <td align="center" width="33%">
        <h3>🧠 AI Extraction</h3>
        <p>Google Gemini maps any column layout → <br/>15 standardized CRM fields.</p>
      </td>
      <td align="center" width="33%">
        <h3>📊 Rich Dashboard</h3>
        <p>Summary cards, searchable table, <br/>colored status pills, dynamic columns.</p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <h3>🌙 Dark Mode</h3>
        <p>System-aware theme with <br/>manual toggle support.</p>
      </td>
      <td align="center">
        <h3>⚡ Batch Processing</h3>
        <p>Parallel AI requests with configurable <br/>concurrency & automatic retries.</p>
      </td>
      <td align="center">
        <h3>🔒 Production Ready</h3>
        <p>Rate limiting, configurable CORS, <br/>trust proxy, and mock fallback mode.</p>
      </td>
    </tr>
  </table>
</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js 16 App (React 19)                 │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │  │
│  │  │ DropZone │  │ Upload   │  │ Import Result      │   │  │
│  │  │ + Modal  │  │ Progress │  │ Table + Summary    │   │  │
│  │  └────┬─────┘  └──────────┘  └────────┬───────────┘   │  │
│  │       │                                │               │  │
│  │  ┌────▼────────────────────────────────▼───────────┐   │  │
│  │  │           PapaParse (CSV → JSON)                 │   │  │
│  │  └────────────────────┬────────────────────────────┘   │  │
│  └───────────────────────┼────────────────────────────────┘  │
└──────────────────────────┼───────────────────────────────────┘
                           │  POST /api/import
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Backend                        │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  Rate      │  │  Validation  │  │  AI Service         │   │
│  │  Limiter   │─▶│  Middleware  │─▶│  (Gemini / Mock)    │   │
│  └────────────┘  └──────────────┘  └─────────┬──────────┘   │
│                                              │               │
│  ┌───────────────────────────────────────────▼───────────┐   │
│  │              CRM Validator & Cleaner                    │   │
│  │  (Normalizes fields, validates statuses & sources)     │   │
│  └──────────────────────┬────────────────────────────────┘   │
│                         ▼                                    │
│              Structured JSON Response                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
📦 groweasy-csv-importer
├── 🖥️ backend/                          # Express.js API server
│   ├── 📁 src/
│   │   ├── 📄 config.ts                 # Centralized env configuration
│   │   ├── 📄 index.ts                  # Express app entry point
│   │   ├── 📁 middleware/
│   │   │   ├── 📄 errorHandler.ts       # Global error handling
│   │   │   └── 📄 validateBody.ts       # Request validation
│   │   ├── 📁 prompts/
│   │   │   ├── 📄 systemPrompt.ts       # Gemini system instruction
│   │   │   └── 📄 fewShotExamples.ts    # Few-shot training examples
│   │   ├── 📁 routes/
│   │   │   ├── 📄 health.ts            # GET /api/health
│   │   │   └── 📄 import.ts            # POST /api/import
│   │   ├── 📁 services/
│   │   │   ├── 📄 aiService.ts         # Gemini integration + mock fallback
│   │   │   └── 📄 crmValidator.ts      # Field normalization & validation
│   │   ├── 📁 types/
│   │   │   ├── 📄 ai.ts                # AI batch types
│   │   │   ├── 📄 api.ts               # API request/response types
│   │   │   └── 📄 crm.ts              # Core CRM record types
│   │   └── 📁 utils/
│   │       └── 📄 logger.ts            # Console logger utility
│   ├── 📄 .env.example                  # Environment template
│   └── 📄 package.json
│
├── 🎨 frontend/                         # Next.js 16 application
│   ├── 📁 src/
│   │   ├── 📁 app/                      # Next.js App Router
│   │   │   ├── 📄 globals.css          # Tailwind imports + dark mode
│   │   │   ├── 📄 layout.tsx           # Root layout with metadata
│   │   │   └── 📄 page.tsx            # Main page with all states
│   │   ├── 📁 components/
│   │   │   ├── 📁 import/              # Import progress, result table, summary
│   │   │   ├── 📁 layout/              # Sidebar navigation
│   │   │   ├── 📁 preview/             # CSV preview table
│   │   │   ├── 📁 ui/                  # Reusable: Button, Card, Table, Badge, Pagination...
│   │   │   └── 📁 upload/              # Upload modal, drop zone
│   │   ├── 📁 hooks/                    # useCsvParser, useImportSubmit, useTheme
│   │   ├── 📁 services/                # Axios API client
│   │   └── 📁 types/                   # Frontend type definitions
│   ├── 📄 .env.example                  # Environment template
│   └── 📄 package.json
│
├── 📄 sample.csv                        # Quick-test CSV (8 cols, 2 rows)
├── 📄 customers-1000.csv                # Large dataset (12 cols, 1000 rows)
└── 📄 README.md                         # This document
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | ≥ 18 | JavaScript runtime |
| **npm**     | ≥ 9  | Package manager |

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/Santosh9192/GrowEasy_CSV
cd groweasy-csv-importer

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
cd ..
```

### 2️⃣ Configure Environment

```bash
# Backend — copy and edit
cp backend/.env.example backend/.env

# Frontend — copy (defaults work locally)
cp frontend/.env.example frontend/.env.local
```

<details>
<summary><strong>🔧 Click to see backend configuration options</strong></summary>

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ❌ | `4000` | Server port |
| `GEMINI_API_KEY` | ⚠️ | — | Google Gemini key. **Optional** — mock mode works without it |
| `CORS_ORIGIN` | ❌ | `*` | Allowed origins (comma-separated for multiple) |
| `TRUST_PROXY` | ❌ | `false` | Set `true` behind Vercel/Railway/Nginx |
| `RATE_LIMIT_MAX` | ❌ | `30` | Max import requests per window |
| `BATCH_SIZE` | ❌ | `20` | Rows per AI batch |
| `MAX_CONCURRENCY` | ❌ | `3` | Concurrent AI requests |
| `AI_MODEL` | ❌ | `gemini-2.0-flash` | Gemini model version |

> ⚠️ `GEMINI_API_KEY` is optional — the app includes a **mock processor** that works without it.  
> Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
</details>

### 3️⃣ Start Development Servers

```bash
# Terminal 1 — Backend (http://localhost:4000)
cd backend && npm run dev

# Terminal 2 — Frontend (http://localhost:3000)
cd frontend && npm run dev
```

### 4️⃣ Walk Through the App

1. Open **[http://localhost:3000](http://localhost:3000)**
2. Click the orange **"Import CSV"** button in the top bar
3. Drag `sample.csv` or `customers-1000.csv` onto the dropzone
4. **Preview** — see all columns parsed with a scrollable table
5. Click **"Upload File"** (orange button)
6. **Results** — view summary cards, search leads, colored status pills, and auto-discovered extra columns

---

## 📖 API Reference

### `GET /api/health`

Quick health check to verify the server is running.

```json
// Response 200
{ "status": "ok", "timestamp": "2026-07-12T10:00:00.000Z" }
```

### `POST /api/import`

Submit CSV rows for AI-powered extraction. The backend processes them in parallel batches and returns structured CRM records.

**Request:**
```json
{
  "rows": [
    {
      "Name": "John Doe",
      "Email": "john@example.com",
      "Phone": "+1-555-1234",
      "Company": "Acme Inc",
      "City": "New York",
      "Country": "USA"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "processed": [
      {
        "created_at": "2026-07-12T10:00:00.000Z",
        "name": "John Doe",
        "email": "john@example.com",
        "country_code": "+1",
        "mobile_without_country_code": "555-1234",
        "company": "Acme Inc",
        "city": "New York",
        "state": "-",
        "country": "USA",
        "lead_owner": "-",
        "crm_status": "GOOD_LEAD_FOLLOW_UP",
        "crm_note": "-",
        "data_source": "-",
        "possession_time": "-",
        "description": "-",
        "original_data": { "Name": "John Doe", "Email": "...", "Phone": "+1-555-1234", "Company": "Acme Inc", "City": "New York", "Country": "USA" }
      }
    ],
    "skipped": [],
    "failed": [],
    "counts": { "total": 1, "processed": 1, "skipped": 0, "failed": 0 },
    "processingTimeMs": 1234
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "rows must be a non-empty array"
  }
}
```

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| `400` | `INVALID_INPUT` | Missing/invalid `rows` array or exceeds 10,000 rows |
| `429` | `RATE_LIMIT_EXCEEDED` | Too many requests — wait and retry |
| `500` | `AI_PROCESSING_ERROR` | AI extraction failed after all retries |
| `500` | `INTERNAL_SERVER_ERROR` | Unexpected server error |

---

## 🌐 Deployment

### Backend → Railway / Render / Fly.io

One-click deploy template for Railway:

[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://railway.app/new)

```bash
# Required environment variables:
CORS_ORIGIN=https://your-frontend.vercel.app
TRUST_PROXY=true
GEMINI_API_KEY=your-gemini-key

# Build:  cd backend && npm run build
# Start:  cd backend && npm start
```

### Frontend → Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

| Environment Variable | Value |
|---------------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.railway.app` |

> **Zero config**: Vercel auto-detects Next.js. Just connect your repo and set the env variable above.

### Production Checklist

- [ ] Set a real `GEMINI_API_KEY` for AI extraction
- [ ] Configure `CORS_ORIGIN` to your frontend URL only
- [ ] Enable `TRUST_PROXY=true` behind any reverse proxy
- [ ] Adjust `RATE_LIMIT_MAX` based on expected traffic
- [ ] Add authentication middleware for multi-user scenarios
- [ ] Set up monitoring and error tracking (e.g., Sentry)
- [ ] Configure proper logging (e.g., Winston, Pino)

---

## 🧠 AI Extraction Details

### How It Works

1. **System Prompt** — A carefully engineered instruction set tells Gemini to extract all 15 CRM fields
2. **Few-Shot Examples** — 4 diverse examples teach the AI common CSV patterns
3. **Batch Processing** — Rows are split into batches (default 20) and processed concurrently (default 3)
4. **Retry Logic** — Failed batches retry up to 3 times with exponential backoff
5. **Fallback Mode** — If no API key is provided, a sophisticated mock processor extracts fields using regex patterns

### CRM Fields Extracted

| # | Field | Description | Extraction Strategy |
|---|-------|-------------|-------------------|
| 1 | `created_at` | Lead creation date | Parse any date column → ISO 8601 |
| 2 | `name` | Full lead name | Concatenate first/last name columns |
| 3 | `email` | Primary email | First email found; rest go to crm_note |
| 4 | `country_code` | Phone country code | Extract from phone number or country column |
| 5 | `mobile_without_country_code` | Mobile number | First phone found; rest go to crm_note |
| 6 | `company` | Company name | Scan: Company, Organization, Business, Firm |
| 7 | `city` | City | Scan: City, Town, Location, District |
| 8 | `state` | State/Region | Scan: State, Province, Region |
| 9 | `country` | Country | Scan: Country, Nation, Territory |
| 10 | `lead_owner` | Responsible person | Scan: Lead Owner, Assigned To, Sales Rep |
| 11 | `crm_status` | Lead status | Infer from notes → colored pill display |
| 12 | `crm_note` | Notes / remarks | Catch-all for unmapped data |
| 13 | `data_source` | Source | Scan: Lead Source, Campaign, Channel |
| 14 | `possession_time` | Property time | Scan: Possession, Move-in, Handover |
| 15 | `description` | Description | Scan: Description, Comments, Details |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | ![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js) | React framework with App Router |
| **UI Library** | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react) | Component-based UI |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript) | Type-safe development |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss) | Utility-first CSS |
| **Backend** | ![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express) | Node.js HTTP server |
| **AI** | ![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlebard) | Google Generative AI |
| **CSV Parsing** | ![PapaParse](https://img.shields.io/badge/PapaParse-00B4D8?style=flat-square) | Client-side CSV → JSON |
| **HTTP Client** | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios) | API communication |

</div>

---

## ✅ Assignment Checklist

This project was built for the **GrowEasy Software Developer Assignment**. Here's how it measures up:

| Requirement | Status | Notes |
|-------------|--------|-------|
| **Step 1 — Upload CSV** | ✅ | Drag & drop + file picker, any CSV format |
| **Step 2 — Preview** | ✅ | Sticky headers, horizontal/vertical scroll, responsive |
| **Step 3 — Confirm Import** | ✅ | Confirmation before backend call |
| **Step 4 — Display Parsed Result** | ✅ | Summary cards + table with search & pagination |
| **Backend API — Accept any CSV** | ✅ | No fixed column assumptions |
| **AI Extraction** | ✅ | Google Gemini with batch processing |
| **All 15 CRM Fields** | ✅ | Every field extracted with dash fallback |
| **CRM Status Values** | ✅ | Only valid statuses accepted |
| **Data Source Values** | ✅ | Only valid sources accepted |
| **Date Format** | ✅ | ISO 8601, JS `new Date()` compatible |
| **CRM Notes** | ✅ | Extra data captured in crm_note |
| **Multiple Emails/Mobiles** | ✅ | First used, rest in crm_note |
| **Skip Invalid Records** | ✅ | No email + no mobile → skipped |
| **TypeScript** | ✅ | Full type safety frontend + backend |
| **Dark Mode** | ✅ | System-aware + manual toggle |
| **Error Handling** | ✅ | Graceful errors with retry options |
| **Rate Limiting** | ✅ | Configurable, protects /api/import |
| **CORS Configuration** | ✅ | Configurable for production |
| **Mock Mode** | ✅ | Works without API key |
| **Progress Indicator** | ✅ | Loading overlay during AI processing |
| **Retry Mechanism** | ✅ | Exponential backoff for failed batches |

### Bonus Features

| Bonus | Status | Implementation |
|-------|--------|---------------|
| Drag & Drop upload | ✅ | Built into UploadModal |
| Progress indicators | ✅ | ImportProgress overlay during processing |
| Retry mechanism | ✅ | 3 retries with exponential backoff |
| Dark mode | ✅ | System-aware + localStorage toggle |
| Deployment config | ✅ | CORS, trust proxy, rate limiting |
| Docker setup | 🚧 | Coming soon |
| Unit tests | 🚧 | Coming soon |
| Virtualized tables | 🚧 | Load-more pagination implemented |

---

## 📄 License

This project is submitted as part of the **GrowEasy Software Developer Assignment**.

---

<div align="center">
  <p style="font-size: 0.9rem; color: #888;">
    Built with ❤️ for GrowEasy &nbsp;·&nbsp; 
    <a href="https://groweasy.ai">groweasy.ai</a> &nbsp;·&nbsp; 
    Assignment Deadline: July 12, 2026
  </p>
  <p style="font-size: 0.8rem; color: #aaa;">
    Submission: <a href="mailto:varun@groweasy.ai">varun@groweasy.ai</a> &nbsp;·&nbsp; 
    Position: Software Developer (Intern / Full-Time)
  </p>
</div>
