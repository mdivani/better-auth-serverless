import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'auth-service',
  frameworkVersion: '4',
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    stage: '${opt:stage, "dev"}',
    region: 'us-west-1',
    environment: {
      BASE_URL: '{env:BASE_URL}',
      ALLOWED_ORIGINS: '{env:ALLOWED_ORIGINS}',
      BETTER_AUTH_SECRET: '{env:BETTER_AUTH_SECRET}',
      DATABASE_URL: '{env:DATABASE_URL}',
      REDIRECT_DOMAIN: '{env:REDIRECT_DOMAIN}',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    iamRoleStatements: [],
  },
  plugins: [
    'serverless-offline',
    'serverless-export-env',
    'serverless-domain-manager',
  ],
  functions: {
    Authorizer: {
      handler: 'src/functions/auth/authorizer/handler.main',
    },
    Auth: {
      handler: 'src/functions/auth/proxy/handler.main',
      events: [
        {
          http: {
            method: 'any',
            path: '/',
            cors: {
              origin: '${self:custom.${self:provider.stage}.origins}',
              methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
              allowCredentials: true,
            },
            integration: 'lambda_proxy',
          },
        },
        {
          http: {
            method: 'any',
            path: '/{proxy+}',
            cors: {
              origin: '${self:custom.${self:provider.stage}.origins}',
              methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
              allowCredentials: true,
            },
            integration: 'lambda_proxy',
          },
        },
      ],
      timeout: 29,
    },
  },
  custom: {
    dev: {
      name: 'dev',
      domain: 'api.dev.example.com',
    },
    prod: {
      name: 'prod',
      domain: 'api.example.com',
    },
    customDomain: {
      rest: {
        domainName: '${self:custom.${self:provider.stage}.domain}',
        stage: '${self:provider.stage}',
        basePath: 'auth',
        createRoute53Record: true,
      },
    },
    exportEnv: {
      filename: '.env',
    },
  },
  package: {
    individually: true,
    patterns: [
      'node_modules/.prisma/client/schema.prisma',
      'node_modules/.prisma/client/libquery_engine-*',
    ],
  },
};

module.exports = serverlessConfiguration;
