const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 8080;

// Trust Cloud Run proxy to get real client IP
app.set('trust proxy', true);

app.use(express.json());

// Rate limiting: 10 requests per hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Rate limit exceeded. Maximum 10 requests per hour allowed.',
      retryAfter: '1 hour',
      timestamp: new Date().toISOString(),
      clientIP: req.ip // Show the IP being rate limited for debugging
    });
  }
});

const getHTMLTemplate = (title, content) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <title>${title} — GCP Cloud Run v3.0</title>
  <style>
    :root{
      --bg:#0a0e27;
      --card-bg:#1a1f3a;
      --text:#e4e4e7;
      --muted:#94a3b8;
      --accent:#00ff88;
      --border:#2d3548;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{
      font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;
      background:var(--bg);
      color:var(--text);
      line-height:1.6;
      padding:40px 20px;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .container{max-width:900px;width:100%;margin:0 auto}
    .hero{text-align:center;padding:20px 0}
    .gcp-logo-container{
      display:flex;
      justify-content:center;
      margin-bottom:30px;
    }
    .gcp-logo{
      width:120px;
      height:120px;
      filter:drop-shadow(0 4px 12px rgba(0,255,136,0.2));
      animation:float 3s ease-in-out infinite;
    }
    @keyframes float{
      0%,100%{transform:translateY(0px)}
      50%{transform:translateY(-10px)}
    }
    .hero-name{
      font-size:clamp(32px,4.5vw,48px);
      font-weight:700;
      margin-bottom:4px;
      color:var(--text);
    }
    .hero-role{
      font-size:clamp(16px,2vw,20px);
      margin-bottom:4px;
      color:var(--accent);
      font-weight:600;
      margin-bottom:20px;
      letter-spacing:1px;
    }
    .info-box{
      background:var(--card-bg);
      border:2px solid var(--border);
      border-left:4px solid var(--accent);
      border-radius:12px;
      padding:32px;
      margin:40px 0;
    }
    .info-box h2{
      font-size:24px;
      margin-bottom:20px;
      color:var(--accent);
    }
    .info-box p{
      color:var(--muted);
      margin-bottom:12px;
      font-size:16px;
      line-height:1.8;
    }
    .info-box strong{
      color:var(--text);
    }
    .stats{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:20px;
      margin:40px 0;
    }
    .stat-card{
      background:var(--card-bg);
      border:2px solid #00d084;
      background:rgba(0,208,132,0.05);
      border-radius:12px;
      padding:24px;
      text-align:center;
      transition:all 0.3s ease;
    }
    .stat-card:hover{
      border-color:var(--accent);
      transform:translateY(-3px);
      box-shadow:0 6px 20px rgba(0,255,136,0.12);
    }
    .stat-card .number{
      font-size:36px;
      font-weight:800;
      color:var(--accent);
      margin-bottom:8px;
    }
    .stat-card .label{
      font-size:13px;
      color:var(--muted);
      text-transform:uppercase;
      letter-spacing:1px;
    }
    .tech-divider{
      width:100%;
      height:2px;
      background:var(--border);
      margin:40px 0;
    }
    .badge{
      display:inline-block;
      padding:8px 16px;
      background:var(--accent);
      color:var(--bg);
      border-radius:999px;
      font-weight:700;
      font-size:14px;
      margin:10px 5px;
    }
    .link-badge{
      display:inline-block;
      padding:12px 24px;
      background:var(--accent);
      color:var(--bg);
      border-radius:8px;
      font-weight:700;
      font-size:16px;
      margin:10px 5px;
      text-decoration:none;
      border:2px solid var(--accent);
      transition:all 0.2s ease;
    }
    .link-badge:hover{
      background:transparent;
      color:var(--accent);
    }
    .footer{
      text-align:center;
      margin-top:40px;
      padding-top:20px;
      border-top:1px solid var(--border);
      color:var(--muted);
      font-size:14px;
    }
    .tech-stack-label{
      text-align:center;
      font-size:15px;
      text-transform:uppercase;
      letter-spacing:2px;
      color:var(--text);
      font-weight:600;
      margin-bottom:20px;
    }
    .url-display{
      background:var(--card-bg);
      border:1px solid var(--border);
      border-radius:8px;
      padding:12px 16px;
      font-family:monospace;
      color:var(--accent);
      text-align:center;
      margin:20px 0;
      font-size:14px;
      word-break:break-all;
    }
    @keyframes pulse{
      0%,100%{opacity:1}
      50%{opacity:0.7}
    }
    .pulse{animation:pulse 2s ease-in-out infinite}
    .stack-section{
      margin-top:40px;
    }
    .stack-header{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:6px;
      margin-bottom:20px;
      padding:0;
      text-align:center;
    }
    .stack-title{
      font-size:14px;
      text-transform:uppercase;
      letter-spacing:2px;
      color:var(--text);
      font-weight:600;
    }
    .benefits-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:20px;
      margin-bottom:20px;
    }
    .benefit-card{
      background:var(--card-bg);
      border:2px solid #00d084;
      background:rgba(0,208,132,0.05);
      border-radius:12px;
      padding:24px;
      text-align:center;
      transition:all 0.3s ease;
    }
    .benefit-card:hover{
      border-color:var(--accent);
      transform:translateY(-3px);
      box-shadow:0 6px 20px rgba(0,255,136,0.12);
    }
    .benefit-icon{
      font-size:48px;
      margin-bottom:12px;
    }
    .benefit-title{
      font-size:18px;
      font-weight:700;
      color:var(--text);
      margin-bottom:8px;
    }
    .benefit-text{
      font-size:14px;
      color:var(--muted);
      line-height:1.5;
    }
    .tech-modal{
      position:fixed;
      inset:0;
      z-index:250;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      pointer-events:none;
      transition:opacity .2s ease;
      padding:20px;
    }
    .tech-modal.open{
      opacity:1;
      pointer-events:auto;
    }
    .tech-modal-overlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.7);
      z-index:1;
    }
    .tech-modal-content{
      position:relative;
      z-index:2;
      background:var(--bg);
      border:2px solid var(--border);
      border-radius:16px;
      max-width:800px;
      width:100%;
      max-height:90vh;
      overflow-y:auto;
      padding:32px;
      box-shadow:0 20px 60px rgba(0,255,136,0.1);
    }
    .tech-modal-header{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:24px;
    }
    .tech-modal-header h2{
      font-size:32px;
      color:var(--accent);
      display:flex;
      align-items:center;
    }
    .tech-modal-close{
      background:transparent;
      border:1px solid var(--border);
      color:var(--text);
      padding:10px 14px;
      border-radius:8px;
      cursor:pointer;
      font-size:24px;
    }
    .tech-modal-close:hover{
      border-color:var(--accent);
      color:var(--accent);
    }
    .tech-modal-section{
      margin-bottom:24px;
    }
    .tech-modal-section h3{
      font-size:20px;
      color:var(--text);
      margin-bottom:12px;
    }
    .tech-modal-section p{
      color:var(--muted);
      line-height:1.8;
      margin-bottom:12px;
      font-size:16px;
    }
    .tech-modal-code{
      background:var(--card-bg);
      border:1px solid var(--border);
      border-radius:8px;
      padding:16px;
      overflow-x:auto;
      margin-top:12px;
    }
    .tech-modal-code pre{
      margin:0;
      color:var(--text);
      font-size:13px;
      line-height:1.6;
      font-family:monospace;
    }
    .terraform-logo{
      width:48px;
      height:48px;
      margin-right:12px;
    }
    .terraform-btn{
      display:inline-flex;
      align-items:center;
      padding:12px 24px;
      background:var(--card-bg);
      color:var(--text);
      border-radius:8px;
      font-weight:700;
      font-size:16px;
      margin:10px 5px;
      border:2px solid var(--border);
      cursor:pointer;
      transition:all 0.2s ease;
    }
    .terraform-btn:hover{
      border-color:var(--accent);
      transform:translateY(-2px);
      box-shadow:0 4px 12px rgba(0,255,136,0.2);
    }
    .terraform-btn img{
      width:24px;
      height:24px;
      margin-right:10px;
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>

  <div id="techModal" class="tech-modal">
    <div class="tech-modal-overlay" onclick="closeTerraformModal()"></div>
    <div class="tech-modal-content">
      <div class="tech-modal-header">
        <h2><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" class="terraform-logo">Terraform Configuration</h2>
        <button class="tech-modal-close" onclick="closeTerraformModal()">✕</button>
      </div>
      <div id="techModalBody"></div>
    </div>
  </div>

  <script>
    function openTerraformModal() {
      const modal = document.getElementById('techModal');
      const body = document.getElementById('techModalBody');

      body.innerHTML = '<div class="tech-modal-section">' +
        '<h3>main.tf</h3>' +
        '<p>Defines the Cloud Run service with auto-scaling configuration</p>' +
        '<div class="tech-modal-code"><pre>resource "google_cloud_run_service" "gcp_health_api" {\\n' +
        '  name     = "gcp-health-api"\\n' +
        '  location = var.region\\n\\n' +
        '  template {\\n' +
        '    spec {\\n' +
        '      containers {\\n' +
        '        image = "gcr.io/$' + '{var.project_id}/gcp-health-api:latest"\\n\\n' +
        '        ports {\\n' +
        '          container_port = 8080\\n' +
        '        }\\n\\n' +
        '        resources {\\n' +
        '          limits = {\\n' +
        '            cpu    = "1"\\n' +
        '            memory = "512Mi"\\n' +
        '          }\\n' +
        '        }\\n\\n' +
        '        env {\\n' +
        '          name  = "GCP_REGION"\\n' +
        '          value = var.region\\n' +
        '        }\\n' +
        '      }\\n\\n' +
        '      container_concurrency = 80\\n' +
        '      timeout_seconds       = 300\\n' +
        '    }\\n\\n' +
        '    metadata {\\n' +
        '      annotations = {\\n' +
        '        "autoscaling.knative.dev/minScale" = "0"\\n' +
        '        "autoscaling.knative.dev/maxScale" = "3"\\n' +
        '      }\\n' +
        '    }\\n' +
        '  }\\n\\n' +
        '  traffic {\\n' +
        '    percent         = 100\\n' +
        '    latest_revision = true\\n' +
        '  }\\n\\n' +
        '  autogenerate_revision_name = true\\n' +
        '}\\n\\n' +
        'resource "google_cloud_run_service_iam_member" "public_access" {\\n' +
        '  service  = google_cloud_run_service.gcp_health_api.name\\n' +
        '  location = google_cloud_run_service.gcp_health_api.location\\n' +
        '  role     = "roles/run.invoker"\\n' +
        '  member   = "allUsers"\\n' +
        '}</pre></div>' +
        '</div>' +
        '<div class="tech-modal-section">' +
        '<h3>provider.tf</h3>' +
        '<p>Configures the Google Cloud provider</p>' +
        '<div class="tech-modal-code"><pre>terraform {\\n' +
        '  required_providers {\\n' +
        '    google = {\\n' +
        '      source  = "hashicorp/google"\\n' +
        '      version = "~> 5.0"\\n' +
        '    }\\n' +
        '  }\\n' +
        '}\\n\\n' +
        'provider "google" {\\n' +
        '  credentials = file(var.credentials_file)\\n' +
        '  project     = var.project_id\\n' +
        '  region      = var.region\\n' +
        '}</pre></div>' +
        '</div>' +
        '<div class="tech-modal-section">' +
        '<h3>variables.tf</h3>' +
        '<p>Defines configuration variables</p>' +
        '<div class="tech-modal-code"><pre>variable "project_id" {\\n' +
        '  type        = string\\n' +
        '  description = "GCP Project ID"\\n' +
        '}\\n\\n' +
        'variable "region" {\\n' +
        '  type        = string\\n' +
        '  description = "Region for Cloud Run"\\n' +
        '  default     = "us-west1"\\n' +
        '}\\n\\n' +
        'variable "credentials_file" {\\n' +
        '  type        = string\\n' +
        '  description = "Path to GCP service account key"\\n' +
        '}</pre></div>' +
        '</div>' +
        '<div class="tech-modal-section">' +
        '<h3>outputs.tf</h3>' +
        '<p>Defines what information to return after deployment</p>' +
        '<div class="tech-modal-code"><pre>output "gcp_health_api_url" {\\n' +
        '  value       = google_cloud_run_service.gcp_health_api.status[0].url\\n' +
        '  description = "URL of the GCP Health API Cloud Run service"\\n' +
        '}\\n\\n' +
        'output "service_name" {\\n' +
        '  value       = google_cloud_run_service.gcp_health_api.name\\n' +
        '  description = "Name of the Cloud Run service"\\n' +
        '}\\n\\n' +
        'output "service_location" {\\n' +
        '  value       = google_cloud_run_service.gcp_health_api.location\\n' +
        '  description = "Location where the service is deployed"\\n' +
        '}</pre></div>' +
        '</div>';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeTerraformModal() {
      const modal = document.getElementById('techModal');
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeTerraformModal();
    });
  </script>
</body>
</html>
`;

// Redirect /health to main page
app.get('/health', (_req, res) => {
  res.redirect('/');
});

app.get('/', (req, res) => {
  const currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const content = `
    <div class="hero">
      <div class="gcp-logo-container">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud Platform" class="gcp-logo">
      </div>
      <h1 class="hero-name">GCP Cloud Run Demo</h1>
      <div class="hero-role">Deployed with Terraform</div>

    </div>

    <div class="info-box">
      <h2>🔍 Proof of Deployment</h2>
      <p style="font-size:14px;color:var(--muted);margin-bottom:12px;">The URL you're visiting right now is provided by Google Cloud:</p>
      <div class="url-display">${currentUrl}</div>
      <p style="font-size:14px;color:var(--muted);margin-top:12px;">This Cloud Run URL shows it's running on Google's infrastructure.</p>
    </div>

    <p style="color:var(--muted);margin-top:16px;font-size:16px;text-align:center;">
      Containerized service deployed to Google Cloud Platform using Infrastructure as Code.
    </p>
    <div style="text-align:center;margin:20px 0;">
      <button class="terraform-btn" onclick="openTerraformModal()">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform">
        View Terraform Configuration
      </button>
    </div>

    <div class="tech-divider"></div>

    <div class="stack-section">
      <div class="stack-header">
        <span class="stack-title">WHAT THIS DEMONSTRATES</span>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🏗️</div>
          <div class="benefit-title">Infrastructure as Code</div>
          <div class="benefit-text">Terraform automation</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">☁️</div>
          <div class="benefit-title">Cloud Deployment</div>
          <div class="benefit-text">GCP Cloud Run</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">📦</div>
          <div class="benefit-title">Containerization</div>
          <div class="benefit-text">Docker packaging</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🔌</div>
          <div class="benefit-title">API Development</div>
          <div class="benefit-text">Node.js + Express</div>
        </div>
      </div>
    </div>

    <div class="tech-divider"></div>

    <div class="info-box">
      <p style="margin-bottom:12px;"><strong>How It Works:</strong></p>
      <p style="font-size:15px;"><strong>1.</strong> Cloud Run spins up container → <strong>2.</strong> Serves this page → <strong>3.</strong> Scales to zero</p>
      <p style="margin-top:16px;font-size:14px;color:var(--muted);">
        <strong>Stack:</strong> Node.js ${process.version} • Docker • Terraform • GCP Region: ${process.env.GCP_REGION || 'us-west1'}
      </p>
    </div>

    <div class="footer">
      <p>Built & Deployed by John Hope Dawa • Over-engineered by Design ✅</p>
    </div>
  `;

  res.send(getHTMLTemplate('GCP Cloud Run Portfolio Demo', content));
});

// Redirect /status to main page
app.get('/status', (_req, res) => {
  res.redirect('/');
});

// JSON endpoint for programmatic access (rate limited)
app.get('/api/health', limiter, (_req, res) => {
  res.json({
    status: 'ok',
    service: 'gcp-health-api',
    message: 'GCP Cloud Run is operational',
    timestamp: new Date().toISOString(),
    region: process.env.GCP_REGION || 'unknown',
    deployment: 'cloud-run',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    nodeVersion: process.version,
    platform: process.platform
  });
});

app.listen(PORT, () => {
  console.log(`GCP Health API running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  - GET / (Main page with all info)');
  console.log('  - GET /api/health (JSON format)');
});
