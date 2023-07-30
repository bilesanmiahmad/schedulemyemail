import boto3
import os
import json
import uuid
from datetime import datetime, timedelta

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
    schedule_date_and_time = f"{activity['scheduledDate']} {activity['scheduledTime']}"
    schedule_date_and_time_datetime = datetime.strptime(schedule_date_and_time, '%Y-%m-%d %H:%M')
    
    timezone_offset = int(activity['timezoneOffset'])
    
    offseted_date_and_time = schedule_date_and_time_datetime + timedelta(minutes=timezone_offset)

    params = {
        'id': str(uuid.uuid4()),
        'emailAddress': activity['emailAddress'],
        'emailContent': activity['emailContent'],
        'scheduledDate': offseted_date_and_time.strftime("%Y-%m-%d"),
        'scheduledTime': offseted_date_and_time.strftime("%H:%M"),
        'timezoneOffset': timezone_offset,
        'completionStatus': 'NOT SENT',
        'createdDate': str(datetime.timestamp(datetime.now()))
    }
    response = table.put_item(TableName=table_name, Item=params)

    return {
        'statusCode': 201,
        'headers': {
            "Access-Control-Allow-Origin" : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : True,
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'message': 'New Email Scheduled'})
    }