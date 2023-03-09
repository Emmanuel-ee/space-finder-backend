import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import {PolicyStatement} from '@aws-cdk/aws-iam'
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



    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler'
    });
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*')
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);


    // Hello Api lambda integration:
    const helloLambdaIntegration = new apigw.LambdaIntegration(helloLambdaNodeJs)
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
