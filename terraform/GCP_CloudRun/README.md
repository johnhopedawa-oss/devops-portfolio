# GCP Cloud Run Deployment

This directory contains Terraform configuration to deploy the GCP Health API to Google Cloud Run.

## Prerequisites

1. **GCP Account** with billing enabled
2. **GCP CLI (`gcloud`)** installed and authenticated
3. **Terraform** installed
4. **Service Account Key** (JSON file) with permissions:
   - Cloud Run Admin
   - Service Account User
5. **Docker Hub account** with the image pushed

## Quick Start

### 1. Set up GCP credentials

```bash
# Authenticate with GCP
gcloud auth login
gcloud config set project john-devops

# Place your service account key in this directory
# terraform/GCP_CloudRun/gcpkey.json
```

### 2. Ensure Docker image is on Docker Hub

The CI/CD pipeline automatically builds and pushes to Docker Hub when you push to main branch.

To manually build and push:
```bash
# From the project root
docker build -t johnhopedawa/gcp-health-api:latest ./website/backend/gcp-health-api
docker push johnhopedawa/gcp-health-api:latest
```

### 3. Deploy with Terraform

```bash
cd terraform/GCP_CloudRun

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply the configuration
terraform apply
```

### 4. Get the Cloud Run URL

```bash
terraform output gcp_health_api_url
```

Update your `.env` file with this URL:
```env
GCP_HEALTH_API_URL=<the-url-from-terraform-output>
```

## Using the Automated Script

For convenience, use the deployment script from the project root:

```bash
chmod +x deploy-gcp-health.sh
./deploy-gcp-health.sh
```

This script will:
1. Pull the latest image from Docker Hub
2. Deploy with Terraform
3. Display the Cloud Run URL

## Configuration

Edit `variables.tf` to customize:
- `project_id`: Your GCP project ID (default: "john-devops")
- `region`: Deployment region (default: "us-west1")
- `credentials_file`: Path to service account key

## Image Source

The Terraform configuration pulls the Docker image from:
- **Docker Hub**: `docker.io/johnhopedawa/gcp-health-api:latest`

Cloud Run will automatically pull this public image when deploying.

## Resources Created

- **Cloud Run Service**: `gcp-health-api`
  - Auto-scaling: 0-3 instances
  - CPU: 1 vCPU
  - Memory: 512Mi
  - Publicly accessible
- **API Enablement**:
  - Cloud Run API
  - Cloud Build API

## Terraform Commands

```bash
# Initialize
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy all resources
terraform destroy

# View outputs
terraform output

# View specific output
terraform output gcp_health_api_url
```

## Updating the Service

To update the deployed service:

1. Push changes to your repository
2. GitHub Actions will build and push to Docker Hub
3. Redeploy with Terraform:
   ```bash
   terraform apply
   ```

Cloud Run will automatically pull the new image and deploy it.

## Cost Considerations

Cloud Run pricing is based on:
- **CPU and Memory**: Charged per 100ms of use
- **Requests**: First 2 million requests/month are free
- **Networking**: Egress charges apply

With `minScale = 0`, the service scales to zero when idle, minimizing costs.

## Troubleshooting

### Image not found
```bash
# Verify image exists on Docker Hub
docker pull johnhopedawa/gcp-health-api:latest

# Or check on Docker Hub website
# https://hub.docker.com/r/johnhopedawa/gcp-health-api
```

### Permission denied
```bash
# Verify service account has required roles
gcloud projects get-iam-policy john-devops

# Add missing roles if needed
gcloud projects add-iam-policy-binding john-devops \
  --member="serviceAccount:your-sa@john-devops.iam.gserviceaccount.com" \
  --role="roles/run.admin"
```

### API not enabled
```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com
```

## Security Notes

- **Never commit `gcpkey.json`** to version control
- The service is publicly accessible (required for the demo)
- For production, consider adding authentication
- Regularly rotate service account keys
- Docker Hub image is public - ensure no secrets in the image
