# Enable required APIs
resource "google_project_service" "run" {
  service = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  service = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_cloud_run_service" "gcp_health_api" {
  name     = "gcp-health-api"
  location = var.region

  template {
    spec {
      containers {
        image = "ghcr.io/johnhopedawa/overengineered-gcp-health-api:latest"

        ports {
          container_port = 8080
        }

        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }

        env {
          name  = "GCP_REGION"
          value = var.region
        }
      }

      container_concurrency = 80
      timeout_seconds       = 300
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = "0"
        "autoscaling.knative.dev/maxScale" = "3"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true

  depends_on = [
    google_project_service.run,
    google_project_service.cloudbuild
  ]
}

resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_service.gcp_health_api.name
  location = google_cloud_run_service.gcp_health_api.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
