terraform {
    required_providers {
      google = {
        source = "hashicorp/google"
        version = "~> 5.0"
      }
    }
}

provider "google" {
    credentials = file(var.credentials_file)
    project = var.project_id
    region = var.region
}

resource "google_container_cluster" "autopilot" {
    name = "john-gke"
    location = var.region
    enable_autopilot = true
}