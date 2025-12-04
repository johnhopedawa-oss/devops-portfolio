output "gcp_health_api_url" {
  value       = google_cloud_run_service.gcp_health_api.status[0].url
  description = "URL of the GCP Health API Cloud Run service"
}

output "service_name" {
  value       = google_cloud_run_service.gcp_health_api.name
  description = "Name of the Cloud Run service"
}

output "service_location" {
  value       = google_cloud_run_service.gcp_health_api.location
  description = "Location where the service is deployed"
}
