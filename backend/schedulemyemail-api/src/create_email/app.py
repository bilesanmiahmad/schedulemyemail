import boto3
import os
import json
import uuid
from datetime import datetime

def lambda_handler(message, context):
    if ('body' not in message or message['httpMethod'] != 'POST'):
        return {
            'statusCode': 400,
            'headers': {},
            'body': json.dumps({'msg': 'Bad Request'})
        }
    table_name = os.environ.get('TABLE', 'Emails')
    region = os.environ.get('REGION', 'eu-west-2')
    email_table = boto3.resource('dynamodb', region_name=region)
    table = email_table.Table(table_name)
    activity = json.loads(message['body'])
    params = {
        'id': str(uuid.uuid4()),
        'emailAddress': activity['emailAddress'],
        'emailContent': activity['emailContent'],
        'scheduledDate': activity['scheduledDate'],
        'scheduledTime': activity['scheduledTime'],
        'completionStatus': 'NOT SENT',
        'createdDate': str(datetime.timestamp(datetime.now()))
    }
    response = table.put_item(TableName=table_name, Item=params)

    print(response)
    return {
        'statusCode': 201,
        'headers': {},
        'body': json.dumps({'message': 'New Email Scheduled'})
    }