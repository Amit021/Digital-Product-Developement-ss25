import aws_cdk as core
import aws_cdk.assertions as assertions

from fall_detection_app.fall_detection_app_stack import FallDetectionAppStack

# example tests. To run these tests, uncomment this file along with the example
# resource in fall_detection_app/fall_detection_app_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = FallDetectionAppStack(app, "fall-detection-app")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
