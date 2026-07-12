import axios from 'axios';
import { ImportResponse } from '@/types/import';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 300000,
  headers: { 'Content-Type': 'application/json' },
});

export async function submitImport(
  rows: Record<string, string>[]
): Promise<ImportResponse> {
  const { data } = await client.post<ImportResponse>('/api/import', { rows });
  return data;
}
