import os
from aws_cdk import (
    Duration,
    Stack,
    aws_lambda as lambda_,
    aws_apigateway as apigw,
    CfnOutput,
)
from constructs import Construct
from aws_cdk import CfnResource

class FallDetectionAppStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # 1) Create an AWS HealthLake FHIR datastore (FHIR R4)
        healthlake_datastore = CfnResource(
            self, "HealthLakeDatastore",
            type="AWS::HealthLake::FHIRDatastore",
            properties={
                "DatastoreTypeVersion": "R4"
            }
        )
        
        # 2) Get the FHIR endpoint from the datastore
        fhir_endpoint = healthlake_datastore.get_att("DatastoreEndpoint").to_string()
        
        # 3) Patient Lookup Lambda
        patient_lookup_lambda = lambda_.Function(
            self, "PatientLookupFunction",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("backend/patient_lookup"),
            timeout=Duration.seconds(10),
            environment={
                "FHIR_ENDPOINT": fhir_endpoint
            }
        )
        
        # 4) PDF Generator Lambda
        pdf_generator_lambda = lambda_.Function(
            self, "PDFGeneratorFunction",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("backend/pdf_generator"),
            timeout=Duration.seconds(10)
        )
        
        # 5) Create an API Gateway
        api = apigw.RestApi(
            self, "FallDetectionAPI",
            rest_api_name="Fall Detection Service"
        )
        
        # 6) /patient GET endpoint
        patient_resource = api.root.add_resource("patient")
        patient_resource.add_method("GET", apigw.LambdaIntegration(patient_lookup_lambda))
        
        # 7) /generate-pdf POST endpoint
        pdf_resource = api.root.add_resource("generate-pdf")
        pdf_resource.add_method("POST", apigw.LambdaIntegration(pdf_generator_lambda))
        
        # 8) Output the API URL and FHIR endpoint
        CfnOutput(self, "ApiUrl", value=api.url)
        CfnOutput(self, "FHIRDatastoreEndpoint", value=fhir_endpoint)
