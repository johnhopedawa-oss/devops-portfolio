# Overengineered

An intentionally over-architected personal website demonstrating DevOps practices and microservices architecture.

## Architecture

```
Browser → NGINX (Port 80) → Static Files
              ↓
         /api/* requests
              ↓
    API Gateway (Port 3000) ─┬─→ Resume API (Port 3001) → MongoDB
                             │
                             └─→ [Future APIs...]
```

**Microservices Pattern:**
- NGINX handles static content and proxies API requests to the gateway
- API Gateway routes requests to appropriate microservices
- Each microservice is isolated with its own container and network
- MongoDB is accessible only to services that need it (not exposed externally)

## Tech Stack

**Currently Running:**
- Docker + Docker Compose
- NGINX (reverse proxy & static file server)
- Node.js/Express (API Gateway + Microservices)
- MongoDB (database)
- Microservices architecture

**Planned:**
- Kubernetes (k3s cluster)
- Terraform (infrastructure as code)
- GitHub Actions CI/CD
- Prometheus + Grafana (monitoring)
- HashiCorp Vault (secrets management)
- ELK Stack (logging)

## Quick Start

```bash
cd docker-compose
docker compose up --build
```

Visit http://localhost

## Project Structure

```
Overengineered/
├── website/
│   ├── frontend/
│   │   ├── public/              # HTML, CSS, JS, assets
│   │   ├── nginx.conf           # NGINX configuration
│   │   └── dockerfile
│   └── backend/
│       ├── api-gateway/         # Routes requests to microservices
│       │   ├── server.js
│       │   ├── dockerfile
│       │   └── package.json
│       └── resume-api/          # Resume microservice
│           ├── server.js        # API endpoints
│           ├── seedData.js      # Database seeding
│           ├── dockerfile
│           └── package.json
├── docker-compose/
│   └── docker-compose.yaml      # Container orchestration
├── kubernetes/                   # K8s manifests (planned)
└── .env                         # Environment variables
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb://mongodb:27017
USER_EMAIL=your.email@example.com
USER_NAME=Your Name
USER_LOCATION=Your City, State
USER_PHONE=123-456-7890
```

## API Endpoints

**Via API Gateway (`http://localhost/api/`):**

- `GET /api/resume` - Returns resume data from MongoDB
  - Routes through gateway → resume-api microservice

**Direct Access (for development):**

- API Gateway: `http://localhost:3000/health`
- Resume API: `http://localhost:3001/health` (internal only in production)

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full plan.

---

**Status:** Phase 1 Complete | Moving to Kubernetes next
