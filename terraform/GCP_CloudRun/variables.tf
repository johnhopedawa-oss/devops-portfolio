variable "project_id" {
  type        = string
  description = "john-devops"
}

variable "region" {
  type        = string
  description = "Region for Cloud Run"
  default     = "us-west1"
}

variable "credentials_file" {
  type        = string
  description = "/terraform/GCP_CloudRun/gcpkey.json"
}