import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { join } from 'path';

export class SpaceFinderBackendStack extends cdk.Stack {

  private api = new apigw.RestApi(this, 'SpaceApi')
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



    const helloLambda = new lambda.Function(this, 'helloLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
      handler: 'hello.main'
    })


    // Hello Api lambda integration:
    const helloLambdaIntegration = new apigw.LambdaIntegration(helloLambda)
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
