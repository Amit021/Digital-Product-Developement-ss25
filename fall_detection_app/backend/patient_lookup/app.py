import json
import os
import requests

def lambda_handler(event, context):
    # Get HealthLake FHIR endpoint
    fhir_endpoint = os.environ.get("FHIR_ENDPOINT")
    if not fhir_endpoint:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "FHIR endpoint not configured"})
        }
    
    # Get 'name' from query parameters (e.g., ?name=John Smith)
    query_params = event.get('queryStringParameters') or {}
    full_name = query_params.get('name')
    if not full_name:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing patient name"})
        }
    
    # Split the name into 'given' and 'family'
    parts = full_name.strip().split()
    given = parts[0] if len(parts) > 0 else ""
    family = parts[1] if len(parts) > 1 else ""
    
    # Construct FHIR search URL
    # e.g., https://<FHIR_ENDPOINT>/Patient?family=Smith&given=John
    search_url = f"{fhir_endpoint}/Patient?family={family}&given={given}"
    
    try:
        response = requests.get(search_url)
        response.raise_for_status()
    except requests.RequestException as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Error fetching patient data", "details": str(e)})
        }
    
    data = response.json()
    filtered_data = []
    
    # Filter the FHIR response to nurse-relevant fields
    for entry in data.get("entry", []):
        resource = entry.get("resource", {})
        nurse_view = {
            "id": resource.get("id"),
            "name": resource.get("name"),
            "gender": resource.get("gender"),
            "birthDate": resource.get("birthDate"),
            "allergies": resource.get("allergyIntolerance", [])
        }
        filtered_data.append(nurse_view)
    
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(filtered_data)
    }
