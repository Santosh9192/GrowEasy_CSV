<div align="center">

<img src="https://img.shields.io/badge/GrowEasy-CRM-orange?style=for-the-badge" alt="GrowEasy CRM"/>

# 🤖 AI-Powered CSV Importer

### Transform Any CSV into Structured CRM Records using Google Gemini AI

An intelligent CSV Import System built for the **GrowEasy Software Developer Assignment**.

Instead of relying on fixed column names, this application uses **Google Gemini AI** to understand CSV data from **any source**, automatically mapping it into standardized CRM records.

---

### 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🚀 Frontend | https://grow-easy-csv-virid.vercel.app |
| ⚙️ Backend API | https://groweasy-backend-cr5t.onrender.com |
| ❤️ Health Check | https://groweasy-backend-cr5t.onrender.com/api/health |

---

<p align="center">

<img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js"/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react"/>

<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript"/>

<img src="https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express"/>

<img src="https://img.shields.io/badge/Google-Gemini-blue?style=flat-square&logo=google"/>

<img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat-square&logo=tailwind-css"/>

<img src="https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel"/>

<img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render"/>

<img src="https://img.shields.io/badge/License-MIT-success?style=flat-square"/>

</p>

---

### 📌 Quick Links

[✨ Features](#-features) •
[🏗 Architecture](#-architecture) •
[📂 Project Structure](#-project-structure) •
[🚀 Quick Start](#-quick-start) •
[📖 API](#-api-reference) •
[🌐 Deployment](#-deployment) •
[🛠 Tech Stack](#-tech-stack)

</div>

---

# ✨ Features

## 📤 Smart CSV Upload

- Drag & Drop Upload
- Traditional File Picker
- Supports CSV files from any source
- No predefined format required

---

## 🧠 AI-Powered Data Extraction

Powered by **Google Gemini AI**

Automatically extracts and standardizes:

- Name
- Email
- Phone Number
- Country Code
- Company
- City
- State
- Country
- Lead Owner
- CRM Status
- CRM Notes
- Data Source
- Possession Time
- Description
- Created Date

even when the CSV uses completely different column names.

---

## 📊 Interactive Dashboard

After processing:

- Search Records
- Summary Cards
- Dynamic Table
- Status Badges
- Pagination
- Responsive Design

---

## 🌙 Dark Mode

- Automatic System Theme Detection
- Manual Theme Toggle
- Fully Responsive

---

## ⚡ High Performance

- Batch Processing
- Parallel AI Requests
- Retry Mechanism
- Request Validation
- Rate Limiting

---

## 🔒 Production Ready

✔ Express Rate Limiter

✔ Configurable CORS

✔ Environment Variables

✔ Trust Proxy Support

✔ Error Handling Middleware

✔ Mock Mode (Works without Gemini API)

---

# 🏗 Architecture

```text
                   User
                    │
                    ▼
        Next.js 16 Frontend (React 19)
                    │
         Upload CSV / Preview CSV
                    │
              PapaParse Parser
                    │
                    ▼
      POST /api/import (Axios Request)
                    │
                    ▼
         Express.js Backend API
                    │
     ┌──────────────┼───────────────┐
     │              │               │
 Validation    Rate Limiter     Error Handler
     │              │               │
     └──────────────┼───────────────┘
                    │
                    ▼
           Google Gemini AI
                    │
                    ▼
        CRM Data Normalization
                    │
                    ▼
        Structured CRM JSON Output
                    │
                    ▼
       Frontend Dashboard Display
```

---

# 📂 Project Structure

```text
GrowEasy_CSV
│
├── backend
│   │
│   ├── src
│   │   ├── middleware
│   │   ├── prompts
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   ├── config.ts
│   │   └── index.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend
│   │
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   │
│   ├── public
│   ├── package.json
│   ├── next.config.ts
│   └── .env.example
│
├── sample.csv
├── customers-1000.csv
├── README.md
└── LICENSE
```

---

# 🚀 Live Deployment

### Frontend

**Vercel**

https://grow-easy-csv-virid.vercel.app

---

### Backend

**Render**

https://groweasy-backend-cr5t.onrender.com

---

### Health Check

https://groweasy-backend-cr5t.onrender.com/api/health

---

**➡️ Continue with Part 2:** Quick Start, Environment Variables, Installation, and API Reference.
# 🚀 Quick Start

Follow these steps to run the project locally.

---

## 📋 Prerequisites

Make sure the following software is installed.

| Software | Version |
|----------|----------|
| Node.js | 18+ |
| npm | 9+ |
| Git | Latest |
| Google Gemini API Key *(Optional)* | Latest |

> **Note:** The project also supports **Mock Mode**, so a Gemini API key is **not required** for testing.

---

# 📥 Clone Repository

```bash
git clone https://github.com/Santosh9192/GrowEasy_CSV.git

cd GrowEasy_CSV
```

---

# 📦 Install Dependencies

## Backend

```bash
cd backend

npm install
```

---

## Frontend

```bash
cd ../frontend

npm install
```

---

# ⚙ Backend Environment Variables

Create a file

```text
backend/.env
```

Example

```env
PORT=4000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

CORS_ORIGIN=http://localhost:3000

TRUST_PROXY=false

RATE_LIMIT_MAX=30

BATCH_SIZE=20

MAX_CONCURRENCY=3

AI_MODEL=gemini-2.0-flash
```

---

# ⚙ Frontend Environment Variables

Create

```text
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For production

```env
NEXT_PUBLIC_API_URL=https://groweasy-backend-cr5t.onrender.com
```

---

# ▶ Run Backend

```bash
cd backend

npm run dev
```

Server

```
http://localhost:4000
```

---

# ▶ Run Frontend

```bash
cd frontend

npm run dev
```

Open

```
http://localhost:3000
```

---

# 🚀 Using the Application

### Step 1

Open the application.

```
http://localhost:3000
```

---

### Step 2

Click

```
Import CSV
```

---

### Step 3

Upload any CSV file.

Example files included:

- sample.csv
- customers-1000.csv

---

### Step 4

Preview your CSV.

The application automatically parses all columns without assuming any fixed structure.

---

### Step 5

Click

```
Upload File
```

---

### Step 6

The backend sends batches to Google Gemini AI.

---

### Step 7

The application displays

- CRM Summary
- Searchable Table
- CRM Status
- Lead Counts
- Failed Records
- Skipped Records
- Processing Time

---

# 📖 API Reference

---

## GET /api/health

Health endpoint used to verify that the backend is running.

### URL

```
GET https://groweasy-backend-cr5t.onrender.com/api/health
```

### Example Response

```json
{
  "status": "ok",
  "timestamp": "2026-07-12T11:42:33.685Z"
}
```

---

## POST /api/import

Processes uploaded CSV rows using Google Gemini AI.

### URL

```
POST https://groweasy-backend-cr5t.onrender.com/api/import
```

---

## Request Body

```json
{
  "rows": [
    {
      "Name": "John Doe",
      "Email": "john@example.com",
      "Phone": "+91 9876543210",
      "Company": "GrowEasy",
      "City": "Pune",
      "Country": "India"
    }
  ]
}
```

---

## Successful Response

```json
{
  "success": true,
  "data": {
    "processed": [
      {
        "created_at": "2026-07-12T11:00:00.000Z",
        "name": "John Doe",
        "email": "john@example.com",
        "country_code": "+91",
        "mobile_without_country_code": "9876543210",
        "company": "GrowEasy",
        "city": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "lead_owner": "-",
        "crm_status": "GOOD_LEAD_FOLLOW_UP",
        "crm_note": "-",
        "data_source": "-",
        "possession_time": "-",
        "description": "-"
      }
    ],
    "skipped": [],
    "failed": [],
    "counts": {
      "total": 1,
      "processed": 1,
      "skipped": 0,
      "failed": 0
    },
    "processingTimeMs": 1200
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "rows must be a non-empty array"
  }
}
```

---

# 📑 HTTP Status Codes

| Status Code | Meaning |
|------------|---------|
| 200 | Success |
| 400 | Invalid Request |
| 429 | Too Many Requests |
| 500 | AI Processing Error |
| 500 | Internal Server Error |

---

# 🧪 Test the Live Application

### Frontend

https://grow-easy-csv-virid.vercel.app

---

### Backend API

https://groweasy-backend-cr5t.onrender.com

---

### Health Endpoint

https://groweasy-backend-cr5t.onrender.com/api/health

---

**➡️ Continue with Part 3:** Deployment Guide, AI Processing Workflow, CRM Field Mapping, and Production Configuration.
# 🌐 Deployment

The application is fully deployed and publicly accessible.

---

# 🚀 Live Application

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | **Vercel** | https://grow-easy-csv-virid.vercel.app |
| Backend API | **Render** | https://groweasy-backend-cr5t.onrender.com |
| Health Endpoint | **Render** | https://groweasy-backend-cr5t.onrender.com/api/health |

---

# 🚀 Backend Deployment (Render)

The Express.js backend is deployed on **Render**.

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm start
```

---

## Backend Environment Variables

```env
PORT=10000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

CORS_ORIGIN=https://grow-easy-csv-virid.vercel.app

TRUST_PROXY=true

RATE_LIMIT_MAX=30

BATCH_SIZE=20

MAX_CONCURRENCY=3

AI_MODEL=gemini-2.0-flash
```

---

# 🚀 Frontend Deployment (Vercel)

The frontend is deployed using **Vercel**.

### Framework

```
Next.js
```

### Root Directory

```
frontend
```

---

## Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://groweasy-backend-cr5t.onrender.com
```

---

# 🌍 Production URLs

### Frontend

```
https://grow-easy-csv-virid.vercel.app
```

---

### Backend

```
https://groweasy-backend-cr5t.onrender.com
```

---

### Health Check

```
https://groweasy-backend-cr5t.onrender.com/api/health
```

---

# 🧠 AI Processing Workflow

The backend intelligently converts any CSV format into standardized CRM records.

```
CSV Upload
      │
      ▼
PapaParse
(CSV → JSON)
      │
      ▼
Request Validation
      │
      ▼
Batch Creation
      │
      ▼
Google Gemini AI
      │
      ▼
Field Normalization
      │
      ▼
CRM Validation
      │
      ▼
Structured JSON Response
      │
      ▼
Dashboard Display
```

---

# ⚡ Processing Pipeline

### Step 1

CSV is parsed into JSON using **PapaParse**.

---

### Step 2

Rows are divided into configurable batches.

Default

```
20 Rows / Batch
```

---

### Step 3

Multiple batches run simultaneously.

Default

```
3 Concurrent Requests
```

---

### Step 4

Google Gemini analyzes every row.

It identifies

- Names
- Emails
- Phone Numbers
- Companies
- Cities
- Countries
- CRM Status
- Notes

without relying on fixed column names.

---

### Step 5

The backend validates every extracted record.

Invalid records are

- Skipped
- Logged
- Returned separately

---

### Step 6

A clean CRM response is returned to the frontend.

---

# 🔄 Retry Mechanism

If an AI request fails

```
Attempt 1

↓

Attempt 2

↓

Attempt 3

↓

Fail Batch
```

The retry uses exponential backoff to reduce temporary API failures.

---

# 🧾 CRM Fields Extracted

| Field | Description |
|--------|-------------|
| created_at | Lead creation date |
| name | Customer Name |
| email | Email Address |
| country_code | Phone Country Code |
| mobile_without_country_code | Mobile Number |
| company | Company Name |
| city | City |
| state | State |
| country | Country |
| lead_owner | Assigned Owner |
| crm_status | Lead Status |
| crm_note | Additional Notes |
| data_source | Lead Source |
| possession_time | Possession Date |
| description | Description |

---

# 📊 Supported CRM Status Values

The backend validates CRM status before returning results.

Examples

- GOOD_LEAD
- GOOD_LEAD_FOLLOW_UP
- CONTACTED
- INTERESTED
- NOT_INTERESTED
- CALLBACK
- CLOSED
- LOST

Invalid values are automatically normalized.

---

# 📥 Supported Data Sources

Examples

- Website
- Facebook
- Instagram
- Referral
- Google Ads
- LinkedIn
- Walk-In
- WhatsApp
- Email Campaign
- Other

---

# 🛡 Security Features

✔ Express Rate Limiter

✔ Request Validation

✔ Error Handling Middleware

✔ Configurable CORS

✔ Trust Proxy Support

✔ Environment Variables

✔ Mock AI Mode

✔ Batch Processing

✔ Retry Mechanism

---

# 📈 Performance Features

- Concurrent AI Requests
- Optimized Batch Processing
- CSV Parsing on Client Side
- Lazy Rendering
- Dynamic Table Columns
- Search Filtering
- Pagination
- Loading Indicators

---

# 📦 Mock Mode

If no Gemini API key is configured,

the backend automatically switches to **Mock Processing Mode**.

Mock Mode can

- Parse CSV
- Extract Emails
- Extract Phone Numbers
- Generate CRM Records

without making external API calls.

This makes the project easy to test locally.

---

# ✅ Production Checklist

| Task | Status |
|------|--------|
| Backend Deployed | ✅ |
| Frontend Deployed | ✅ |
| Render Configured | ✅ |
| Vercel Configured | ✅ |
| CORS Configured | ✅ |
| Environment Variables Added | ✅ |
| API Health Endpoint Working | ✅ |
| AI Integration Working | ✅ |
| CSV Upload Working | ✅ |
| Dashboard Working | ✅ |

---

**➡ Continue with Part 4:** Tech Stack, Assignment Checklist, Future Improvements, License, Repository, and Footer.
# 🛠 Tech Stack

This project is built using a modern full-stack TypeScript architecture.

| Category | Technology |
|----------|------------|
| Frontend Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Express.js |
| AI | Google Gemini AI |
| CSV Parsing | PapaParse |
| HTTP Client | Axios |
| Package Manager | npm |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |
| Runtime | Node.js |

---

# 📦 Dependencies

## Frontend

- Next.js
- React
- TypeScript
- Axios
- PapaParse
- Tailwind CSS

---

## Backend

- Express.js
- Google Generative AI SDK
- CORS
- dotenv
- Express Rate Limit

---

# 📈 Performance Optimizations

✔ CSV Parsing on Client

✔ AI Batch Processing

✔ Concurrent API Calls

✔ Dynamic Table Rendering

✔ Search Functionality

✔ Pagination

✔ Responsive UI

✔ Dark Mode

✔ Retry Mechanism

✔ Request Validation

✔ Error Handling

✔ Rate Limiting

---

# 📸 Screenshots

You can add screenshots here before submission.

---

## 🏠 Home Page

> Add Screenshot

---

## 📂 CSV Upload

> Add Screenshot

---

## 👀 CSV Preview

> Add Screenshot

---

## 🤖 AI Processing

> Add Screenshot

---

## 📊 Dashboard

> Add Screenshot

---

# 🧪 Testing

## Live Frontend

https://grow-easy-csv-virid.vercel.app

---

## Backend API

https://groweasy-backend-cr5t.onrender.com

---

## Health Endpoint

https://groweasy-backend-cr5t.onrender.com/api/health

---

## Sample CSV Files

The repository contains sample datasets.

- sample.csv
- customers-1000.csv

Simply upload one of these files to test the application.

---

# 📋 Assignment Requirements

| Requirement | Status |
|-------------|--------|
| Upload CSV | ✅ |
| Preview CSV | ✅ |
| Import Confirmation | ✅ |
| AI Field Extraction | ✅ |
| Dynamic CRM Mapping | ✅ |
| Display Processed Records | ✅ |
| Search Records | ✅ |
| Responsive Design | ✅ |
| Dark Mode | ✅ |
| Error Handling | ✅ |
| Retry Mechanism | ✅ |
| Batch Processing | ✅ |
| Rate Limiting | ✅ |
| TypeScript | ✅ |
| Production Deployment | ✅ |

---

# 🎯 Bonus Features

| Feature | Status |
|----------|--------|
| Drag & Drop Upload | ✅ |
| CSV Preview | ✅ |
| AI Mapping | ✅ |
| Dynamic Columns | ✅ |
| Summary Dashboard | ✅ |
| Search | ✅ |
| Pagination | ✅ |
| Mock Mode | ✅ |
| Dark Theme | ✅ |
| Loading Indicators | ✅ |
| Deployment | ✅ |

---

# 🚀 Future Improvements

- User Authentication
- Database Integration
- Export Processed CSV
- Excel (.xlsx) Support
- Duplicate Record Detection
- AI Confidence Scores
- Audit Logs
- Docker Support
- Unit Tests
- Integration Tests
- CI/CD Pipeline
- Multi-user Workspace

---

# 📂 Repository

GitHub Repository

https://github.com/Santosh9192/GrowEasy_CSV

---

# 🌍 Live Deployment

## Frontend (Vercel)

https://grow-easy-csv-virid.vercel.app

---

## Backend (Render)

https://groweasy-backend-cr5t.onrender.com

---

## Health Check

https://groweasy-backend-cr5t.onrender.com/api/health

---

# 👨‍💻 Developer

**Santosh Babar**

Software Developer

GitHub

https://github.com/Santosh9192

---

# 🙏 Acknowledgements

Special thanks to:

- GrowEasy
- Google Gemini AI
- Next.js
- React
- Express.js
- Vercel
- Render

for providing the technologies that made this project possible.

---

# 📄 License

This project is licensed under the **MIT License**.

It was developed as part of the **GrowEasy Software Developer Assignment**.

---

# ⭐ If You Like This Project

If you found this project useful or interesting,

please consider giving it a ⭐ on GitHub.

---

<div align="center">

# 🚀 GrowEasy AI-Powered CSV Importer

### Built with ❤️ by **Santosh Babar**

**Frontend**

https://grow-easy-csv-virid.vercel.app

**Backend**

https://groweasy-backend-cr5t.onrender.com

**GitHub Repository**

https://github.com/Santosh9192/GrowEasy_CSV

---

### Thank you for reviewing my submission.

</div>