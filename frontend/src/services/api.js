/*
// src/services/api.js

import axios from 'axios';

// Use the HAPI FHIR public test server endpoint for R4
const API_BASE_URL = 'https://hapi.fhir.org/baseR4';

export const fetchPatientData = async (patientName) => {
  try {
    // Search for patients by name. The HAPI FHIR server supports the 'name' parameter.
    const response = await axios.get(`${API_BASE_URL}/Patient`, {
      params: { name: patientName }
    });
    return response.data.entry; // Return the list of entries
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw error;
  }
};

export const generatePDFReport = async (payload) => {
  // For development, simulate PDF generation with a delay.
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "dummy_base64_pdf_data";
};
*/




import { mockResidentBundle } from './mockData';

// Simulate fetching all resident records
export const fetchAllResidents = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockResidentBundle.entry;
};

// Simulate fetching a specific resident record by id
export const fetchResidentRecord = async (residentId) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const residentEntry = mockResidentBundle.entry.find(entry => entry.resource.id === residentId);
  return residentEntry ? residentEntry.resource : null;
};

export const generatePDFReport = async (payload) => {
  // Simulate PDF generation delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "dummy_base64_pdf_data";
};
