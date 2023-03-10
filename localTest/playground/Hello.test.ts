import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';


const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: 'f8e56aa9-8514-4464-94e0-c03b3db8e89c'
    }
} as any;


const result = handler(event, {} as any).then((apiResult)=>{
    const items = JSON.parse(apiResult.body);
    console.log(123)
});