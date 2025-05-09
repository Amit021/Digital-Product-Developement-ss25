// frontend/src/services/mockData.js

export const mockResidentBundle = {
    "resourceType": "Bundle",
    "id": "bundle-mock-residents",
    "meta": {
      "lastUpdated": "2025-04-05T00:00:00Z"
    },
    "type": "searchset",
    "entry": [
      {
        "fullUrl": "https://example.org/fhir/Patient/1",
        "resource": {
          "resourceType": "Patient",
          "id": "1",
          "meta": {
            "versionId": "1",
            "lastUpdated": "2025-04-05T00:00:00Z"
          },
          "name": [
            {
              "use": "official",
              "family": "Müller",
              "given": [ "Sarah" ]
            }
          ],
          "gender": "female",
          "birthDate": "1939-08-12",
          "address": [
            {
              "line": ["Example Street 1"],
              "city": "Berlin",
              "postalCode": "10115",
              "country": "Germany"
            }
          ],
          "extension": [
            {
              "url": "http://example.org/fhir/StructureDefinition/photo",
              "valueUrl": "https://example.org/images/sarah-mueller.jpg"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/insurer",
              "valueString": "AOK Plus"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/dnr",
              "valueBoolean": true
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/fallRisk",
              "valueString": "Moderate"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/vaccinations",
              "valueString": "Influenza, COVID-19 Booster"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/hospitalHistory",
              "valueString": "2022-06-15: Hip Surgery; 2023-01-10: Pneumonia"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/medications",
              "valueString": "Rivaroxaban (Xarelto), 40 mg"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/weight",
              "valueQuantity": { "value": 72, "unit": "kg" }
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/height",
              "valueQuantity": { "value": 172, "unit": "cm" }
            }
          ]
        },
        "search": {
          "mode": "match"
        }
      },
      {
        "fullUrl": "https://example.org/fhir/Patient/2",
        "resource": {
          "resourceType": "Patient",
          "id": "2",
          "meta": {
            "versionId": "1",
            "lastUpdated": "2025-04-05T00:00:00Z"
          },
          "name": [
            {
              "use": "official",
              "family": "Schneider",
              "given": [ "Heinz" ]
            }
          ],
          "gender": "male",
          "birthDate": "1945-03-22",
          "address": [
            {
              "line": ["Musterstraße 123"],
              "city": "Munich",
              "postalCode": "80331",
              "country": "Germany"
            }
          ],
          "extension": [
            {
              "url": "http://example.org/fhir/StructureDefinition/photo",
              "valueUrl": "https://example.org/images/heinz-schneider.jpg"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/insurer",
              "valueString": "TK"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/dnr",
              "valueBoolean": false
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/fallRisk",
              "valueString": "High"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/vaccinations",
              "valueString": "Influenza, Pneumococcal, COVID-19"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/hospitalHistory",
              "valueString": "2019-11-05: Cardiac Arrest; 2021-04-20: Stroke"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/medications",
              "valueString": "Aspirin, Atorvastatin"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/weight",
              "valueQuantity": { "value": 80, "unit": "kg" }
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/height",
              "valueQuantity": { "value": 178, "unit": "cm" }
            }
          ]
        },
        "search": {
          "mode": "match"
        }
      },
      {
        "fullUrl": "https://example.org/fhir/Patient/3",
        "resource": {
          "resourceType": "Patient",
          "id": "3",
          "meta": {
            "versionId": "1",
            "lastUpdated": "2025-04-05T00:00:00Z"
          },
          "name": [
            {
              "use": "official",
              "family": "Fischer",
              "given": [ "Karin" ]
            }
          ],
          "gender": "female",
          "birthDate": "1952-11-30",
          "address": [
            {
              "line": ["Bahnhofstraße 45"],
              "city": "Hamburg",
              "postalCode": "20095",
              "country": "Germany"
            }
          ],
          "extension": [
            {
              "url": "http://example.org/fhir/StructureDefinition/photo",
              "valueUrl": "https://example.org/images/karin-fischer.jpg"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/insurer",
              "valueString": "Technischer Krankenkasse"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/dnr",
              "valueBoolean": true
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/fallRisk",
              "valueString": "Low"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/vaccinations",
              "valueString": "Influenza, COVID-19 Booster"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/hospitalHistory",
              "valueString": "2020-08-12: Knee Replacement"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/medications",
              "valueString": "Lisinopril, Metformin"
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/weight",
              "valueQuantity": { "value": 65, "unit": "kg" }
            },
            {
              "url": "http://example.org/fhir/StructureDefinition/height",
              "valueQuantity": { "value": 165, "unit": "cm" }
            }
          ]
        },
        "search": {
          "mode": "match"
        }
      }
    ]
  };
  