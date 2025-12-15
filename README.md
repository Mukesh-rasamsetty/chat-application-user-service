# Chat Users Service

A NestJS backend application providing user management, authentication, and contact services for a chat application. Built with MongoDB and JWT authentication.

## Features

- **User Management**: Register and manage user profiles
- **Authentication**: JWT-based authentication with Auth Guard
- **Contact Management**: Manage user contacts
- **Validation**: Custom pipes for data validation during user registration
- **MongoDB Integration**: Mongoose ODM for database operations
- **Logging**: Custom logging utilities
- **E2E Testing**: Comprehensive end-to-end test coverage

## Tech Stack

- **Framework**: NestJS 11
- **Database**: MongoDB (Mongoose 9)
- **Authentication**: JWT (@nestjs/jwt)
- **Runtime**: Node.js
- **Language**: TypeScript 5
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── app.module.ts                 # Main application module
├── main.ts                       # Application entry point
├── config/                       # Configuration files
│   ├── global.constant.ts        # Global constants
│   └── public.decorator.ts       # Public route decorator
├── logger/                       # Logging utilities
├── pipes/                        # Custom pipes
│   └── user-register.pipe.ts     # User registration validation
├── users/                        # Users module
│   ├── users.controller.ts       # User endpoints
│   ├── users.service.ts          # User business logic
│   ├── users.module.ts           # Users module configuration
│   ├── models/                   # Data models
│   │   ├── user.model.ts
│   │   └── index.ts
│   ├── schemas/                  # MongoDB schemas
│   │   ├── user.schema.ts
│   │   └── index.ts
│   ├── auth/                     # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts         # JWT Guard
│   │   ├── auth.model.ts
│   │   └── auth.module.ts
│   └── contact/                  # Contact management module
│       ├── contact.controller.ts
│       ├── contact.service.ts
│       ├── contact.model.ts
│       └── contact.module.ts
└── test/                         # E2E tests
    └── app.e2e-spec.ts

```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB instance running locally or accessible via connection string

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chat-users
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:

```
MONGO_URI=mongodb://localhost:27017/chat-users
JWT_SECRET=your-secret-key
PORT=3000
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

Application runs with hot-reload enabled on `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## API Endpoints

### Users

- `POST /users/register` - Register a new user (Public)
- `GET /users/profile` - Get user profile (Requires Authentication)

### Authentication

Authentication is enforced globally via the AuthGuard. Decorate routes with `@Public()` to bypass authentication.

## Testing

### Run all tests

```bash
npm run test
```

### Watch mode

```bash
npm run test:watch
```

### Coverage report

```bash
npm run test:cov
```

### E2E tests

```bash
npm run test:e2e
```

## Code Quality

### Linting

```bash
npm run lint
```

### Code formatting

```bash
npm run format
```

## Key Components

### AuthGuard

Global authentication guard that validates JWT tokens in request headers. Public routes are excluded via the `@Public()` decorator.

### UserRegisterPipe

Custom validation pipe for user registration data. Validates required fields and data formats before processing.

### Database

MongoDB with Mongoose ODM for schema definition and data validation.

## Environment Configuration

The application uses MongoDB connection string from `MongoConstants.uri`. Update this in `src/config/global.constant.ts` or via environment variables.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

UNLICENSED

## Support

For issues or questions, please create an issue in the repository.
