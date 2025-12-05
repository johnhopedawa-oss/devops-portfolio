#!/usr/bin/env bash
set -euo pipefail

#Set directory
SCRIPT_DIR="$(cd "$(dirname "#{BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

# -- CONFIG --
KUBE_CONTEXT=prod

# delete all

echo "Deleting everything.."

kubectl delete -f deployment/
kubectl delete -f configmap/
kubectl delete -f ingress/
kubectl delete -f services/
kubectl delete -f pvc/

echo "Deletion complete"
