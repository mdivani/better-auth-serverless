import { auth } from '@lib/auth';
import {
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerResult,
  PolicyDocument,
} from 'aws-lambda';

type AuthResponse = {
  principalId: string;
  policyDocument: PolicyDocument;
};

const generatePolicy = (principalId: string, effect: 'Deny' | 'Allow') => {
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: [`arn:aws:execute-api:${process.env.REGION}:*`],
      },
    ],
  };

  const authResponse: AuthResponse = {
    policyDocument,
    principalId,
  };

  return authResponse;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const main = async (
  event: { authorizationToken: string } & APIGatewayAuthorizerEvent,
): Promise<APIGatewayAuthorizerResult> => {
  const headers: Headers = new Headers({
    Authorization: event.authorizationToken,
  });

  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    return generatePolicy('unauthenticated', 'Deny');
  }

  const { user } = session;

  const response = generatePolicy(user.id, 'Allow');

  return {
    ...response,
    context: {
      sub: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
