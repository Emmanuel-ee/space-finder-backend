//lambda function to put data into dynamodb Table
import { DynamoDB } from "aws-sdk";
import {
    APIGatewayProxyEvent, APIGatewayProxyResult, Context
} from "aws-lambda";
import { v4 } from 'uuid'


// const TABLE_NAME = 'SpacesTable'
const TABLE_NAME = process.env.TABLE_NAME

const docClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context) {
    // const item = {
    //     spaceId: v4(),
    //     data: 'example data',
    // }

    const item = typeof event.body == 'object' ? event.body: JSON.parse(event.body);
    item.spaceId = v4();

    const params = {
        TableName: TABLE_NAME!,
        Item: item
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

    result.body = JSON.stringify(`Created item with id: ${item.spaceId}`)
    return result

};

export { handler }