#!/usr/bin/env node
import 'source-map-support/register';

import { SpaceFinderBackendStack } from '../lib/space-finder-backend-stack';
import { App } from 'aws-cdk-lib'


const app = new App()
new SpaceFinderBackendStack(app, 'Space-finder', {
    stackName:'SpaceFinder'
})