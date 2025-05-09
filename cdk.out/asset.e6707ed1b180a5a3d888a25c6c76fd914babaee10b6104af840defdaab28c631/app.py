import json
from fpdf import FPDF
import base64
import io

def lambda_handler(event, context):
    try:
        payload = json.loads(event['body'])
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON input", "details": str(e)})
        }
    
    patient = payload.get("patient", {})
    nurse_notes = payload.get("nurseNotes", "")
    place_of_fall = payload.get("placeOfFall", "N/A")
    
    # Create a PDF document
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(200, 10, txt="Patient Fall Report", ln=True, align="C")
    pdf.ln(10)
    
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Patient Name: {patient.get('name', 'N/A')}", ln=True)
    pdf.cell(200, 10, txt=f"Patient ID: {patient.get('id', 'N/A')}", ln=True)
    pdf.cell(200, 10, txt=f"Gender: {patient.get('gender', 'N/A')}", ln=True)
    pdf.cell(200, 10, txt=f"Birth Date: {patient.get('birthDate', 'N/A')}", ln=True)
    pdf.ln(5)
    
    pdf.cell(200, 10, txt=f"Place Of Fall: {place_of_fall}", ln=True)
    pdf.ln(5)
    
    pdf.multi_cell(0, 10, txt=f"Nurse Notes: {nurse_notes}")
    
    # Convert PDF to bytes
    pdf_buffer = io.BytesIO()
    pdf.output(pdf_buffer)
    pdf_bytes = pdf_buffer.getvalue()
    
    # Encode as Base64
    pdf_base64 = base64.b64encode(pdf_bytes).decode('utf-8')
    
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=fall_report.pdf"
        },
        "body": pdf_base64,
        "isBase64Encoded": True
    }
