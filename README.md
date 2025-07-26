# Auth Service

A serverless authentication service built with [BetterAuth](https://github.com/BetterAuth/betterauth), Express.js, and AWS Lambda. This service provides scalable authentication with a custom Lambda authorizer for API Gateway.

## Stack

- **AWS Lambda** - Serverless compute
- **Express.js** - Web framework
- **BetterAuth** - Authentication library
- **Prisma** - PostgreSQL ORM
- **Serverless Framework v4** - Deployment
- **Node.js 22** - Runtime

## Quick Start

### Prerequisites

- Node.js 22+
- Yarn 4+ (`corepack enable`)
- PostgreSQL database
- AWS account (for deployment)

### Setup

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Environment configuration**
   Create `.env` file:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/auth_service"

   # BetterAuth
   BETTER_AUTH_SECRET="your-secret-key"
   BASE_URL="http://localhost:3000"
   REDIRECT_DOMAIN="http://localhost:3000"

   # CORS
   ALLOWED_ORIGINS="http://localhost:3000"

   # AWS (for deployment)
   AWS_REGION="us-west-1"
   AWS_ACCESS_KEY_ID="your-key"
   AWS_SECRET_ACCESS_KEY="your-secret"
   ```

3. **Database setup**
   ```bash
   yarn prisma generate
   yarn migrate:dev
   ```

4. **Start development server**
   ```bash
   yarn start
   ```

The service will be available at `http://localhost:3000/auth/`

## Architecture

```
API Gateway → Lambda Authorizer → Lambda Function → Express.js → BetterAuth → PostgreSQL
```

### Custom Lambda Authorizer

The service includes a custom Lambda authorizer (`src/functions/auth/authorizer/handler.ts`) that validates JWT tokens from BetterAuth for API Gateway requests.

## Deployment

### Local Development
```bash
yarn start
```

### AWS Deployment
```bash
yarn deploy
yarn deploy --stage prod
```

## Configuration

### BetterAuth Setup

Edit `src/lib/auth.ts` to configure authentication options. For detailed BetterAuth configuration options, see the [official documentation](https://github.com/BetterAuth/betterauth).

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `BETTER_AUTH_SECRET` | JWT signing secret | ✅ |
| `BASE_URL` | Application base URL | ✅ |
| `REDIRECT_DOMAIN` | OAuth redirect domain | ✅ |
| `ALLOWED_ORIGINS` | CORS origins | ✅ |

## API Endpoints

BetterAuth automatically generates authentication endpoints:

- `POST /auth/signin` - Sign in
- `POST /auth/signup` - Sign up
- `POST /auth/signout` - Sign out
- `GET /auth/session` - Get session
- `POST /auth/verify-email` - Verify email
- `GET /auth/oauth/{provider}` - OAuth flow
- `POST /auth/forgot-password` - Password reset
- `POST /auth/2fa/enable` - Enable 2FA

## Extending

### Custom Routes

Add new Lambda functions in `src/functions/` and register them in `serverless.ts`.

### BetterAuth Extensions

This service can be extended according to the [BetterAuth documentation](https://github.com/BetterAuth/betterauth). Add custom plugins, hooks, and configurations in `src/lib/auth.ts`.

### Database Extensions

Add custom models to `prisma/schema.prisma` and run `yarn migrate:dev`.

## Testing

```bash
yarn test
yarn test:watch
```

## Scripts

- `yarn start` - Start development server
- `yarn deploy` - Deploy to AWS
- `yarn test` - Run tests
- `yarn migrate:dev` - Run database migrations
- `yarn lint` - Lint code
- `yarn format` - Format code

## License

ISC License
