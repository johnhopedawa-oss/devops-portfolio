# GCP Health API

A simple, lightweight health check API for demonstrating GCP Cloud Run functionality.

## Features

- **Visual, recruiter-friendly interface** - Beautiful single-page design matching the main website
- **Google Cloud logo** - Prominently displays GCP branding with floating animation
- **Live metrics** - Real-time uptime, memory usage, and system stats
- **URL verification** - Shows the Cloud Run URL to prove GCP deployment
- **Static responses only** - No database connections or continuous processes
- **Scales to zero** - Only runs when receiving requests, minimizing costs

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Server runs on http://localhost:8080
```

## Deployment to GCP Cloud Run

### Step 1: Build and Push Docker Image

```bash
# Navigate to the API directory
cd website/backend/gcp-health-api

# Set your GCP project ID
export PROJECT_ID="your-project-id"

# Build the Docker image
docker build -t gcr.io/${PROJECT_ID}/gcp-health-api:latest .

# Push to Google Container Registry
docker push gcr.io/${PROJECT_ID}/gcp-health-api:latest
```

### Step 2: Deploy with Terraform

```bash
# Navigate to terraform directory
cd ../../../terraform/GCP_CloudRun

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply the configuration
terraform apply
```

After deployment, Terraform will output the Cloud Run service URL.

## Endpoints

### GET /
**Main page** - Beautiful HTML page with:
- Floating Google Cloud logo with animation
- URL verification showing the Cloud Run deployment
- Live metrics (status, uptime, memory, region)
- Visual benefits grid explaining why Cloud Run
- System details (Node.js version, OS, architecture, etc.)
- Styled with the same dark theme as the main website

### GET /api/health
**JSON endpoint** - Programmatic health check for monitoring tools.

**Response:**
```json
{
  "status": "ok",
  "service": "gcp-health-api",
  "message": "GCP Cloud Run is operational",
  "timestamp": "2025-12-03T10:30:00.000Z",
  "region": "us-west1",
  "deployment": "cloud-run",
  "uptime": 42.5,
  "memory": {...},
  "nodeVersion": "v20.x.x",
  "platform": "linux"
}
```

## Cost Optimization

This API is designed for minimal cost:
- **Scales to zero**: When not in use, no instances are running
- **Minimal resources**: Limited to 512Mi memory and 1 CPU
- **No background processes**: Only responds to HTTP requests
- **Max 3 instances**: Prevents unexpected scaling costs

## Architecture

- **Runtime**: Node.js 20 (Alpine Linux)
- **Framework**: Express.js
- **Container**: Docker
- **Platform**: GCP Cloud Run
- **Infrastructure**: Terraform
