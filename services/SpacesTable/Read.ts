//lambda function to Get / Read all data into dynamodb Table
import { DynamoDB } from "aws-sdk";
import {
    APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters, APIGatewayProxyResult, Context
} from "aws-lambda";



// const TABLE_NAME = 'SpacesTable'
const TABLE_NAME = process.env.TABLE_NAME
const PRIMARY_KEY = process.env.PRIMARY_KEY;

const docClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context) {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Data added to DynamoDB table'
    }
    try {
        if (event.queryStringParameters) {
            if (PRIMARY_KEY! in event.queryStringParameters) {
                result.body = await queryWithPrimaryPartition(event.queryStringParameters);
            } else {
                result.body = await queryWithSecondaryPartition(event.queryStringParameters);
            }
        } else {
            result.body = await scanTable();
        }
    } catch (error) {
        let errorMessage = "Failed to put item. check your program";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage)
    };

    return result

};

async function queryWithSecondaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters) {
    const queryKey = Object.keys(queryParams)[0];
    const queryValue = queryParams[queryKey];
    const queryResponse = await docClient.query({
        TableName: TABLE_NAME!,
        IndexName: queryKey,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
            '#zz': queryKey
        },
        ExpressionAttributeValues: {
            ':zzzz': queryValue
        }
    }).promise();
    return JSON.stringify(queryResponse.Items);
}

async function queryWithPrimaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters) {
    const keyValue = queryParams[PRIMARY_KEY!];
    const queryResponse = await docClient.query({
        TableName: TABLE_NAME!,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
            '#zz': PRIMARY_KEY!
        },
        ExpressionAttributeValues: {
            ':zzzz': keyValue
        }
    }).promise();
    return JSON.stringify(queryResponse.Items);
}

async function scanTable(){
    const queryResponse = await docClient.scan({
        TableName: TABLE_NAME!
    }).promise();
    return JSON.stringify(queryResponse.Items)
}

export { handler }