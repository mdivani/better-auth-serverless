/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server');

const server = awsServerlessExpress.createServer(app);

exports.main = (event: any, context: any) => {
  return awsServerlessExpress.proxy(server, event, context);
};
