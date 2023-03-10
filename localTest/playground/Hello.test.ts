import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Update';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '29191766-7113-447e-b7bf-4175be2ebd11'
    },
    body: {
        location: 'new location'
    }
} as any;


const result = handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123)
});