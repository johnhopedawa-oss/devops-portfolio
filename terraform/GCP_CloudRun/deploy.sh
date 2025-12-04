#!/bin/bash
set -e

echo "🚀 GCP Health API Deployment Script"
echo "===================================="

# Configuration
PROJECT_ID="john-devops"
REGION="us-west1"
SERVICE_NAME="overengineered-gcp-health-api"
GITHUB_USERNAME="johnhopedawa"
IMAGE_NAME="ghcr.io/${GITHUB_USERNAME}/${SERVICE_NAME}:latest"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}Step 1: Installing crane (if not already installed)${NC}"
if ! command -v crane &> /dev/null; then
  echo "Installing crane..."
  curl -sL "https://github.com/google/go-containerregistry/releases/latest/download/go-containerregistry_Linux_x86_64.tar.gz" > /tmp/crane.tar.gz
  tar -zxvf /tmp/crane.tar.gz -C /tmp/ crane
  sudo mv /tmp/crane /usr/local/bin/crane
  rm /tmp/crane.tar.gz
fi

echo ""
echo -e "${BLUE}Step 2: Copying image from Docker Hub to GCR${NC}"
gcloud auth configure-docker --quiet
crane copy johnhopedawa/overengineered-gcp-health-api:latest \
  gcr.io/john-devops/gcp-health-api:latest

echo ""
echo -e "${BLUE}Step 4: Deploying with Terraform${NC}"

# Initialize Terraform if needed
if [ ! -d ".terraform" ]; then
  echo "Initializing Terraform..."
  terraform init
fi

# Apply Terraform
terraform apply -auto-approve

# Get the Cloud Run URL
CLOUD_RUN_URL=$(terraform output -raw gcp_health_api_url)

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo -e "${YELLOW}Cloud Run URL:${NC} ${CLOUD_RUN_URL}"
echo ""
echo -e "${YELLOW}Rate Limiting:${NC} 50 requests per hour per IP address"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update your .env file with:"
echo "   GCP_HEALTH_API_URL=${CLOUD_RUN_URL}"
echo ""
echo "2. Restart your API Gateway to pick up the new URL"
echo "   cd docker-compose && docker-compose restart api-gateway"
echo ""
echo "3. Test the endpoint:"
echo "   curl ${CLOUD_RUN_URL}"
echo "   curl http://localhost:3000/api/gcp-health"
echo ""
echo -e "${YELLOW}Rate Limit Headers:${NC}"
echo "  - RateLimit-Limit: 50"
echo "  - RateLimit-Remaining: Shows remaining requests"
echo "  - RateLimit-Reset: When the limit resets"
