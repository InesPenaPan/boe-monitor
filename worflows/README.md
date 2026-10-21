# 🔄 n8n Automation Workflows

> This directory contains the production workflows running inside n8n that power the BOE Monitor Platform. Together, they form an automated ingestion pipeline and an API delivery service that bridges the Spanish Official State Gazette (BOE) Open Data API, Google Gemini LLM, a MySQL persistence layer, and the React frontend client.

## 🗂️ Overview of Workflows

| Workflow | File | Trigger Type | Primary Objective |
| :--- | :--- | :--- | :--- |
| **Ingestion Pipeline** | `BOE - Ingestion Pipeline.json` | Schedule Trigger (Daily at 08:00) & Manual Trigger | Iterates over the last 30 calendar days, fetches daily BOE summaries, filters grants, fetches full legal disposals, extracts key criteria using LLM parsing, and upserts them into MySQL. |
| **API Delivery** | `BOE - API Grants Delivery.json` |  Webhook Trigger | Listens for frontend requests, queries persisted opportunities from MySQL, formats the response payload, and serves them to the React UI. |

## 📥 Worflow 1: Ingestion Pipeline

### High-Level Architecture

```text
[Schedule Trigger (08:00 AM)]
       │
[Manual Trigger] ──► [Code: Generate Dates (30 Days)]
                                │
                                ▼
                       [Loop Over Items] ◄──────────────────────────────────────────────┐
                                │                                                        │
                         (loop iteration)                                                │
                                │                                                        │
                                ▼                                                        │
                       [HTTP: Daily Summary]                                             │
                                │                                                        │
                                ▼                                                        │
                       [Code: Filter Grants]                                             │
                                │                                                        │
                                ▼                                                        │
                       [HTTP Request: Fetch Doc Text]                                    │
                                │                                                        │
                                ▼                                                        │
                       [Basic LLM Chain] ◄── [Google Gemini Chat Model (gemini-2.5-flash)]
                                │                                                        │
                                ▼                                                        │
                       [Code: Format for MySQL]                                          │
                                │                                                        │
                                ▼                                                        │
                       [Execute a SQL query (MySQL)] ────────────────────────────────────┘
```

### Key Workflow Stages

1. **Date Lookback Generation (`Code: Generate Dates`)**:
    * Generates a 30-day lookup window excluding Sundays (when the official regular bulletin is not published).
    * Produces formatted date strings (`YYYYMMDD`) to iterate over the BOE daily summary endpoint.

2. **Loop Resilience & Batch Control (`Loop Over Items`)**:
    * Iterates through the date array one day at a time (`batchSize: 1`).
    * Ensures continuous execution even if a specific day contains no matching records by passing controlled fallback records back to the loop origin.

3. **Summary Fetching & Grant Filtering (`HTTP: Daily Summary`  & `Code: Filter Grants`)**:
    * Hits `https://www.boe.es/datosabiertos/api/boe/sumario/{YYYYMMDD`
    * Filters only eligible official sections: **Section III (Other Dispositions)** and **Section V-B (Other Public Announcements)**.
    * Applies strict regular expressions to isolate grants, scholarships, and subsidies (subvención, ayuda, beca) while actively filtering out irrelevant administrative notices (lost university degree certificates, administrative appeals, procurement tenders).

4. **Full Document Retrieval (`HTTP Request: Fetch Doc Texts`)**:
    * Downloads the full publication text using the direct URL or document endpoint.

5. **LLM Semantic Parsing (`Basic LLM Chain` + `Google Gemini Chat Model`)**:
    * Powered by `gemini-2.5-flash`.
    * Truncates input payload to 14,000 characters to cover regulatory bases, objectives, and eligibility conditions without exceeding context or token budgets.
    * Enforces strict JSON extraction: 
    ```JSON
    {
        "cuantia": "Exact budget, maximum funding, or subsidy percentage",
        "fecha_limite": "Exact application deadline or duration in working days",
        "requisitos": [
            "Key applicant requirement 1",
            "Key applicant requirement 2"
        ]
    }
    ```

6. **Payload Sanitization & Relational Upsert (`Code: Format for MySQL` + `Execute a SQL query`)**:
    * Truncates text strings to ensure strict column constraint compliance.
    * Converts requirements arrays to serialized JSON strings.
    * Executes an idempotent SQL upsert (`INSERT ... ON DUPLICATE KEY UPDATE`) ensuring re-runs do not create duplicate records:

## 🚀 Worflow 2: API Grants Delivery

### High-Level Architecture

```text
[Frontend Client (React)] 
       │ HTTP GET /webhook/grants
       ▼
[Webhook: GET /webhook/grants]
       │
       ▼
[MySQL: Fetch All Active Grants]
       │
       ▼
[Code: Format API Response]
       │
       ▼
[Respond to Webhook] ──► 200 OK (JSON Array of Grant Objects)
```

### Key Workflow Stages

1. **Webhook Trigger (`Webhook`)**:
    * Exposes an HTTP endpoint on `GET /webhook/grants` listening to inbound requests from the forntend.
    * Production URL: http://localhost:5678/webhook/grants.

2. **Database Querying (`MySQL: Fetch All Active Grants`)**: Queries stored records ordered by publication date or primary ID in descending order.

3. **Normalization & Response Delivery  (`Code: Format API Response` & `Respond to Webhook`)**:
    * Parses the native MySQL JSON column `requisitos` into a true JSON array before delivery.
    * Delivers the payload immediately to keep page load times under 300ms.