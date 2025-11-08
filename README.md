# Overengineered

An intentionally over-architected personal website demonstrating DevOps practices and cloud infrastructure.

## Architecture

```
Browser → NGINX → Frontend (Static Files)
              ↓
         /api/* requests
              ↓
    Backend API (Express) → MongoDB
```

## Tech Stack

**Currently Running:**
- Docker + Docker Compose
- NGINX (reverse proxy)
- Node.js/Express (API)
- MongoDB (database)

**Planned:**
- Kubernetes (k3s)
- Terraform
- GitHub Actions CI/CD
- Prometheus + Grafana
- HashiCorp Vault
- ELK Stack

## Quick Start

```bash
cd website
docker-compose up --build
```

Visit http://localhost

## Project Structure

```
website/
├── frontend/
│   ├── public/          # HTML, CSS, JS
│   └── nginx.conf
├── backend/
│   └── resume-api/      # Express API
└── docker-compose.yml
```

## Environment Variables

Create a `.env` file:

```env
MONGO_URL=mongodb://mongodb:27017/resume
USER_EMAIL=your.email@example.com
USER_NAME=Your Name
USER_LOCATION=Your City
USER_PHONE=+1234567890
```

## API

- `GET /api/resume` - Returns resume data from MongoDB

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full plan.

---

**Status:** Phase 1 Complete | Moving to Kubernetes next
