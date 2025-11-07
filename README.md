# Overengineered Resume Website

A deliberately over-architected personal portfolio website showcasing DevOps skills and enterprise-grade practices.

## 🎯 Project Overview

This portfolio demonstrates modern DevOps practices through an intentionally over-engineered architecture. Built with a 3-tier architecture using Docker containers, the website features:

- **Interactive tech stack visualization** with modal popups
- **Infrastructure dashboard** with filtering and search capabilities
- **Responsive design** optimized for desktop and mobile
- **Dynamic resume data** pulled from MongoDB via REST API
- **Progressive UI features** like smooth scroll animations

## 🏗️ Architecture

```
Browser → Nginx (Port 80) → Frontend (Static Files)
                                    ↓
                              API Request (/api/*)
                                    ↓
                          Backend API (Port 3000)
                                    ↓
                          MongoDB (Port 27017)
```

**Request Flow:**
1. Browser sends HTTP request to `http://localhost`
2. Nginx receives request and serves static frontend files (HTML/CSS/JS)
3. Frontend makes API calls to `/api/resume`
4. Backend API (Express) processes requests and queries MongoDB
5. MongoDB returns resume data to API
6. Backend sends JSON response back to frontend
7. Frontend dynamically renders data in the browser

## 💻 Tech Stack

### Currently Implemented
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Web Server:** Nginx (reverse proxy + static file serving)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Containerization:** Docker + Docker Compose
- **Cache Strategy:** Aggressive cache-busting with versioned CSS

### Planned Technologies
- Kubernetes (K3s) for orchestration
- Prometheus + Grafana for monitoring
- Jenkins + GitHub Actions for CI/CD
- Terraform for infrastructure as code
- Ansible for configuration management
- HashiCorp Vault for secrets management

## 📁 Project Structure

```
Overengineered/
├── website/
│   ├── frontend/              # Static files + Nginx
│   │   ├── public/
│   │   │   ├── assets/images/ # Logo and image assets
│   │   │   ├── index.html     # Main landing page
│   │   │   ├── resume.html    # Resume page
│   │   │   ├── contact.html   # Contact page
│   │   │   └── styles.css     # Global styles
│   │   ├── nginx.conf         # Nginx configuration
│   │   └── Dockerfile
│   ├── backend/               # Express API
│   │   ├── resume-api/
│   │   │   ├── server.js      # API server
│   │   │   ├── seedData.js    # Database seeding
│   │   │   └── package.json
│   │   └── Dockerfile
│   └── docker-compose.yml     # Orchestration
├── ROADMAP.md                 # Project roadmap
└── README.md                  # This file
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

**Prerequisites:** Docker and Docker Compose

```bash
cd website
docker-compose up --build
```

The website will be available at **http://localhost**

### Option 2: Local Development

**Prerequisites:** Node.js 18+, MongoDB

```bash
# Start MongoDB (if not running)
mongod

# Backend setup
cd website/backend/resume-api
npm install
node seedData.js           # Seed database
node server.js             # Start API on port 3000

# Frontend
# Serve the frontend/public folder with any static file server
# Or use Live Server extension in VS Code
```

## 🔧 Configuration

### Environment Variables

The backend API uses environment variables for configuration:

```env
MONGO_URL=mongodb://mongodb:27017/resume
USER_EMAIL=your.email@example.com
USER_NAME=Your Name
USER_LOCATION=Your City, Country
USER_PHONE=+1234567890
```

### Nginx Configuration

- **HTML files:** Never cached (no-store, no-cache headers)
- **Static assets:** Cached for 1 year with version-based cache busting
- **API requests:** Proxied to backend on port 3000

## 📊 API Endpoints

- `GET /api/resume` - Returns complete resume data from MongoDB

**Response Schema:**
```json
{
  "name": "string",
  "title": "string",
  "email": "string",
  "location": "string",
  "summary": "string",
  "skills": ["string"],
  "experience": [{
    "company": "string",
    "role": "string",
    "duration": "string",
    "location": "string",
    "responsibilities": ["string"]
  }],
  "interests": ["string"]
}
```

## ✨ Features

### Interactive UI
- **Tech Stack Modals:** Click on any technology logo to see detailed information about how it's used
- **Infrastructure Dashboard:** Drawer menu with service monitoring, search, and filtering
- **Smooth Animations:** Progressive scroll-based animations and transitions
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices

### DevOps Best Practices
- **Containerization:** All services run in isolated Docker containers
- **Multi-stage builds:** Optimized Docker images
- **Environment-based configuration:** Secrets managed via environment variables
- **Health monitoring:** Service status indicators in dashboard
- **Cache optimization:** Strategic caching for performance

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed project phases and future plans.

**Current Phase:** Phase 2 - Security & Secrets Management
**Next Steps:**
- Implement Kubernetes deployment
- Set up monitoring with Prometheus/Grafana
- Build CI/CD pipeline

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Container orchestration with Docker Compose
- Nginx configuration and reverse proxy setup
- RESTful API design with Node.js/Express
- NoSQL database management with MongoDB
- Frontend development with modern JavaScript
- Responsive web design and mobile optimization
- Progressive enhancement and smooth UX
- Cache strategies and performance optimization

## 📝 License

This project is for portfolio and educational purposes.

---

**Last Updated:** 2025-11-06
**Status:** Phase 1 Complete | Phase 2 In Progress
