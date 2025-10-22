# Overengineered Resume Website

A deliberately over-architected personal resume website showcasing DevOps skills.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (served by Nginx)  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**Containerization:** Docker + Docker Compose  
**Future:** Kubernetes (K3s), Prometheus, Grafana, Terraform, Ansible

## Project Structure
```
Overengineered/
├── website/
│   ├── frontend/          # Static files + Nginx
│   ├── backend/           # Express API
│   ├── docker-compose.yml
│   └── README.md
```

## Local Development

**Prerequisites:** Node.js, MongoDB
```bash
cd website/backend
npm install
node seedData.js           # Seed database
node server.js             # Start backend

# Frontend served at http://localhost:3000
```

## Docker Setup
```bash
cd website
docker-compose up --build

# Seed database
docker exec -it backend node seedData.js
```

**Access:** http://localhost

## API Endpoints

- `GET /api/resume` - Returns resume data from MongoDB

## Roadmap

- [x] Set up frontend (HTML/CSS/JS)
- [x] Set up backend API (Node.js + Express)
- [x] Connect to MongoDB
- [x] Create Dockerfiles for frontend and backend
- [x] Test locally with Docker Compose
- [ ] Create Kubernetes manifests (Deployments, Services)
- [ ] Deploy to local K3s cluster
- [ ] Set up Prometheus for metrics collection
- [ ] Configure Grafana dashboards
- [ ] Implement CI/CD pipeline with GitHub Actions
- [ ] Automate infrastructure with Terraform
- [ ] Configuration management with Ansible
- [ ] Deploy to GCP production cluster