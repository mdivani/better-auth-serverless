import { APIGatewayEvent } from 'aws-lambda';

export const MOCK_USER_ID = '123';

export const MOCK_USERNAME = 'test';

export const mockLambdaEvent = (params: {
  httpMethod?: string;
  path?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  queryStringParameters?: Record<string, string> | null;
  pathParameters?: Record<string, string>;
}) =>
  ({
    httpMethod: params.httpMethod || 'GET',
    path: params.path || '/test',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock_token',
      ...params.headers,
    },
    multiValueHeaders: {
      'Content-Type': ['application/json'],
      Authorization: ['Bearer mock_token'],
      // Additional multi-value headers can be added here
    },
    queryStringParameters: params.queryStringParameters || null,
    multiValueQueryStringParameters: null,
    pathParameters: params.pathParameters || null,
    body: params.body ? JSON.stringify(params.body) : null,
    isBase64Encoded: false, // Change to true if body is base64 encoded
    stageVariables: {
      // Example stage variables
      VARIABLE_ONE: 'value1',
      VARIABLE_TWO: 'value2',
    },
    requestContext: {
      resourceId: 'example-resource-id',
      resourcePath: '/test',
      httpMethod: params.httpMethod || 'GET',
      requestId: 'example-request-id',
      path: params.path || '/test',
      accountId: '123456789012',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '127.0.0.1',
        user: null,
        userAgent: 'Custom User Agent',
        userArn: null,
      },
      authorizer: { username: MOCK_USERNAME },
      stage: 'dev',
      domainName: 'example.com',
      apiId: 'example-api-id',
    },
    resource: '/test',
  }) as unknown as APIGatewayEvent;
