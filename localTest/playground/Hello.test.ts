import { APIGatewayProxyEvent } from 'aws-lambda'
import { APIGateway } from 'aws-sdk'
import { handler } from '../../services/SpacesTable/Read'
// import { handler} from '../../services/SpacesTable/Create'


//uncomment bellow to add items to Dynamodb database
// const event = {
//     body: {
//         location: 'Paris'
//     }
// }
// handler(event as any, {} as any)



// uncomment below to Read for Dynamodb
// const result = handler({} as any, {} as any).then((apiResult)=>{
//     const items = JSON.parse(apiResult.body);
//     console.log(123)
// });



const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '74330c02-958c-4e81-af44-5d25f93a193d'
    }
} as any;
const result = handler({} as any, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123)
});