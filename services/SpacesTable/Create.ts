//lambda function to put data into dynamodb Table
import { DynamoDB } from "aws-sdk";
import {
    APIGatewayProxyEvent, APIGatewayProxyResult, Context
} from "aws-lambda";
import { v4 } from 'uuid'

const docClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context) {
    const params = {
        TableName: 'SpacesTable',
        Item: {
            spaceId: v4(),
            data: 'example data',
        },
    };

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Data added to DynamoDB table'
    }
    try {
        await docClient.put(params).promise();
    } catch (error) {
        let errorMessage = "Failed to put item. check your program";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage)
    };
    return {
        result
    };
};

export { handler }