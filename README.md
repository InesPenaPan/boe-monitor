# 📑 BOE Monitor Platform

> An end-to-end, automated, and containerized tracking platform designed to scrape open subsidy calls from the Spanish Official State Gazette (BOE), structure unstructured legal text into actionable metadata using local LLM inference, and display public grants through a citizen-oriented institutional web client.

## 🏛️ System Architecture & Services

The ecosystem operates as a distributed system with standardized network boundaries and dedicated service responsibilities:

| Service | Port | Technology | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **`boe-frontend`** | `3000` | React 19, Vite 8, Tailwind CSS, Nginx | Institutional web catalog, category filtering, and direct links to official BOE publications. |
| **`boe_n8n`** | `5678` | n8n Workflow Automation | Scheduled scraping, data ingestion pipelines, Ollama LLM prompting, and webhook exposure. |
| **`boe_ollama`** | `11434` | Ollama, Llama 3.2:1b | Local model inference parsing grant summaries, deadlines, budgets, and beneficiary profiles |

## 📋 Prerequisites

Before deploying the platform, verify that your environment satisfies the following requirements:

| Requirement | Details & Description |
| :--- | :--- |
| **Docker & Docker Compose** | Docker Desktop (Engine v24+ and Docker Compose v2+) installed for multi-container deployment. |
| **Ollama** | Either run via the bundled Docker service (`boe_ollama`) or installed on the host machine listening at `http://localhost:11434`. |
| **LLM Inference Models** | Pull the lightweight model configured for document parsing (`llama3.2:1b`). |
| **Node.js (Optional)** | Node v20+ and npm if running or developing the frontend outside Docker via Vite (`http://localhost:5173`). |

## 🚀 Running the App

### Step 1: Start the LLM Engine

Open a terminal and start your local Ollama instance. Ensure the default model is downloaded and loaded into memory:

```bash
ollama run llama3.1
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

## 🌐 User Interfaces & Endpoints

Once initialized, access the graphical dashboards and technical interfaces directly from your browser:

* Frontend Application (Web UI): http://localhost:5173
* n8n Workflow Automation Dashboard: http://localhost:5678

## 📁 Project Structure

Each subdirectory is an isolated service containing its own dedicated `README.md`, configuration, and dependency definitions:


```text
boe-monitor/
│
├── boe-app/                # Institutional React frontend application
│
├── docker-compose.yml      # Container orchestration for Ollama, n8n, and Frontend
└── README.md               # Platform architecture overview and deployment guide
```