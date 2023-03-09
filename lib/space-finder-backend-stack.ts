import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { join } from 'path';



export class SpaceFinderBackendStack extends cdk.Stack {

  private api = new apigw.RestApi(this, 'SpaceApi')
  private spacesTable = new GenericTable(
    'SpacesTable',
    'spaceId',
    this
  )
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



    const helloLambdaWebpack = new lambda.Function(this, 'helloLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(join(__dirname, '..', 'build', 'nodeHelloLambda')),
      handler: 'nodeHelloLambda.handler'
    })

    const helloLambda = new lambda.Function(this, 'helloLambdaWebpack', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
      handler: 'hello.main'
    })

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler'
    });


    // Hello Api lambda integration:
    const helloLambdaIntegration = new apigw.LambdaIntegration(helloLambda)
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
