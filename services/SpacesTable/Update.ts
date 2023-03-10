//lambda function to put data into dynamodb Table
import { DynamoDB } from "aws-sdk";
import {
    APIGatewayProxyEvent, APIGatewayProxyResult, Context
} from "aws-lambda";



// const TABLE_NAME = 'SpacesTable'
const TABLE_NAME = process.env.TABLE_NAME as string;

const PRIMARY_KEY = process.env.PRIMARY_KEY as string;

const docClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context) {
   

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Data added to DynamoDB table'
    }

    const requestBody = typeof event.body == 'object' ? event.body: JSON.parse(event.body);
    const spaceId = event.queryStringParameters?.[PRIMARY_KEY]

    if(requestBody && spaceId){
        const requestBodyKey = Object.keys(requestBody)[0];
        const requestBodyValue = requestBody[requestBodyKey];

        const updateResult = await docClient.update({
            TableName: TABLE_NAME,
            Key: {
                [PRIMARY_KEY]: spaceId
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues:{
                ':new': requestBodyValue
            },
            ExpressionAttributeNames:{
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();

        result.body = JSON.stringify(updateResult)
    }


    return result

};

export { handler }