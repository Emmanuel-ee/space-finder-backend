//lambda function to Get / Read all data into dynamodb Table
import { DynamoDB } from "aws-sdk";
import {
    APIGatewayProxyEvent, APIGatewayProxyResult, Context
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
                const keyValue = event.queryStringParameters[PRIMARY_KEY!];
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
                result.body = JSON.stringify(queryResponse);
            }
        } else {
            const queryResponse = await docClient.scan({
                TableName: TABLE_NAME!
            }).promise();
            result.body = JSON.stringify(queryResponse)
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

export { handler }