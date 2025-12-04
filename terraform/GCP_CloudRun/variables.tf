variable "project_id" {
  type        = string
  description = "GCP Project ID"
  default     = "john-devops"
}

variable "region" {
  type        = string
  description = "Region for Cloud Run"
  default     = "us-west1"
}

variable "credentials_file" {
  type        = string
  description = "Path to GCP service account key JSON file"
  default     = "/home/john/project/Devops-Overengineered-Website/terraform/GCP_CloudRun/gcpkey.json"
}