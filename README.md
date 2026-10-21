# 📑 BOE Monitor Platform

> An end-to-end, automated, and containerized tracking platform engineered to scrape public grants and subsidies from the Spanish Official State Gazette (BOE), transform unstructured legal text into actionable metadata using LLM semantic parsing, persist normalized records into MySQL, and display categorized opportunities through a web client.

## 🏛️ System Architecture & Services

The ecosystem operates as a distributed system with standardized network boundaries and dedicated service responsibilities:

| Service | Port | Technology | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **`boe-frontend`** | `3000` | React , Vite, Tailwind CS | Displays official grant and subsidy information. |
| **`n8n`** | `5678` | n8n Workflow Automation | Daily automated ingestion pipelines, 30-day lookback loops, legal text fetching, LLM orchestration, and REST API exposure. |
| **`mysql`** | `3306` | Persistent relational data store with native JSON schema validation for eligibility requirements and deduplication indexes. |

## 📋 Prerequisites

Before deploying the platform, verify that your environment satisfies the following requirements:

| Requirement | Details & Description |
| :--- | :--- |
| **MySQL 8+** | Provided via the bundled docker-compose.yml service, configured with the `boe_db` database. |
| **Google Gemini API Key** | A valid API key is required for the LLM node (`gemini-2.5-flash`). You can obtain a free key at [Google AI Studio](https://aistudio.google.com/app/apikey). |


## 🚀 Running the App

### Step 1: Clone and Configure Environment Variables

Create your local `.env` file at the root level if you plan to override default database credentials or ports:y:

```text
MYSQL_ROOT_PASSWORD=root_secure_password
MYSQL_DATABASE=boe_db
MYSQL_USER=boe_user
MYSQL_PASSWORD=boe_password
```

*(You can type `/bye` to exit the prompt; Ollama will keep running in the background)*

### Step 2: Deploy the Ecosystem

From the root repository directory (where the `docker-compose.yml` is located) build and launch all containers in detached mode:

```PowerShell
docker compose up --build -d
```

### Step 3: Verify Service Health

Inspect the operational status of all platform containers:

```PowerShell
docker compose ps
```
To verify database accessibility and initial table creation:

```PowerShell
docker exec -it boe-mysql mysql -u boe_user -pboe_password -e "USE boe_db; SHOW TABLES;"
```

### Step 4: Import and Activate n8n Workflows

1. Access the n8n dashboard at http://localhost:5678.
2. Navigate to **Workflows > Import from File.**
3. Import both workflows located in the `workflows/´ directory.
4. Set up your credentials in n8n:
   * **MySQL Credentials**: Connect using host `boe-mysql`, user `boe_user`, database `boe_db`, and port `3306`.
   * **Gemini Credentials**: Add your API key under `Google Gemini(PaLM) Api` (or Google Gemini API account).


## 🌐 User Interfaces & Endpoints

Once initialized, access the graphical dashboards and technical interfaces directly from your browser:

* **Frontend Web Application**: http://localhost:3000 
* **n8n Workflow Automation Dashboard**: http://localhost:5678
* **Public Grants Webhook / API Endpoint**: http://localhost:5678/webhook/grants

## 📁 Project Structure

Each subdirectory is an isolated service containing its own dedicated `README.md`, configuration, and dependency definitions:

```text
boe-monitor/
│
├── boe-app/                  # Institutional React frontend application
│   ├── src/                  # Components, state management, and UI layout
│   ├── Dockerfile            # Multi-stage production container build
│   └── package.json          # Frontend dependencies & scripts
│
├── workflows/                # Production n8n automation definitions
│   ├── BOE - Ingestion Pipeline.json   # 30-day scrape, filter, LLM parse & DB upsert
│   ├── BOE - API Grants Delivery.json  # Public webhook exposing SQL results to React
│   └── README.md             # Deep-dive documentation for both pipelines
│
├── docker-compose.yml        # Multi-container orchestration (React, n8n, MySQL)
└── README.md                 # Platform architecture overview and deployment guide
```