# LearnLabz - Tutor Management Platform

A comprehensive Learning Management System (LMS) platform built with Next.js 15, designed for tutors, students, parents, and educational institutes.

## Features

- **Multi-Role Support**: Super Admin, Institute Admin, Tutor, Student, Parent, and more
- **Real-time Authentication**: Keycloak-based JWT authentication
- **Modern UI**: Beautiful, responsive design with shadcn/ui and Tailwind CSS
- **AI Integration**: Google Genkit for AI-powered features
- **Type-Safe**: Full TypeScript support throughout
- **Production-Ready**: Docker support for easy deployment

## Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Authentication**: Keycloak + JWT
- **AI**: Google Genkit
- **Deployment**: Docker + Docker Compose

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd learnlabz
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.learnlabz.com/api

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars

# Keycloak Configuration
NEXT_PUBLIC_KEYCLOAK_REALM=learnlabz
NEXT_PUBLIC_KEYCLOAK_URL=http://keycloak:8080/auth
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=user-service
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

## Docker Deployment

### Production Deployment

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Development with Docker

```bash
# Run development server in Docker with hot reload
docker-compose -f docker-compose.dev.yml up

# Stop development server
docker-compose -f docker-compose.dev.yml down
```

## Project Structure

```
learnlabz/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── super-admin/       # Super Admin portal
│   │   ├── institute-admin/   # Institute Admin portal
│   │   ├── tutor/             # Tutor portal
│   │   ├── student/           # Student portal
│   │   ├── parent/            # Parent portal
│   │   └── login/             # Login page
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── auth/              # Authentication components
│   │   └── providers/         # Context providers
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.tsx        # Authentication hook
│   ├── services/               # API service layer
│   │   └── auth.service.ts    # Auth service
│   ├── lib/                    # Utilities
│   │   ├── api-client.ts      # HTTP client with interceptors
│   │   └── logger.ts          # Logging utility
│   ├── types/                  # TypeScript definitions
│   │   ├── auth.types.ts      # Auth types
│   │   └── api.types.ts       # API types
│   └── config/                 # Configuration
│       ├── env.config.ts      # Environment validation
│       └── routes.config.ts   # Route definitions
├── public/                     # Static assets
├── Dockerfile                  # Production Docker image
├── Dockerfile.dev              # Development Docker image
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose
└── .env.example                # Environment template
```

## API Integration

### Login Endpoint

The application integrates with the backend API for authentication:

**Endpoint**: `POST /user/auth/login`

**Request**:
```json
{
  "data": {
    "username": "johndoe5",
    "password": "securePassword123"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe5",
      "personId": "uuid",
      "first_name": "John",
      "last_name": "Doe"
    },
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "expires_in": 300,
    "token_type": "Bearer"
  },
  "message": "Login successful"
}
```

## Authentication Flow

1. User submits username/password via login form
2. Frontend sends credentials to backend API
3. Backend validates with Keycloak and returns JWT tokens
4. Frontend stores tokens in secure HTTP-only cookies
5. Subsequent requests include access token in Authorization header
6. Token auto-refresh handles expired access tokens

## Available Scripts

```bash
# Development
npm run dev              # Start development server (port 9002)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking

# Docker
docker-compose up -d                           # Start production
docker-compose -f docker-compose.dev.yml up    # Start development
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes | - |
| `JWT_SECRET` | JWT secret for internal use | Yes | - |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes | - |
| `NEXT_PUBLIC_KEYCLOAK_REALM` | Keycloak realm name | Yes | learnlabz |
| `NEXT_PUBLIC_KEYCLOAK_URL` | Keycloak server URL | Yes | - |
| `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` | Keycloak client ID | Yes | user-service |
| `NODE_ENV` | Environment mode | No | development |
| `LOG_LEVEL` | Server log level | No | info |
| `NEXT_PUBLIC_LOG_LEVEL` | Client log level | No | warn |

## User Roles

- **Super Admin**: Platform-wide management
- **Institute Admin**: Institute management
- **Tutor**: Class creation and management
- **Student**: Class enrollment and learning
- **Parent**: Child progress monitoring
- **Teacher Assistant**: Delegated tutor functions
- **Branch Manager**: Branch-level administration
- **Accountant**: Financial management
- **Coordinator**: Communication coordination

## Key Features

### Authentication & Security
- JWT-based authentication with Keycloak
- Secure HTTP-only cookie storage
- Automatic token refresh
- Role-based access control (RBAC)
- Permission-based authorization

### API Client
- Centralized HTTP client with interceptors
- Automatic retry logic with exponential backoff
- Request/response logging
- Error handling and transformation
- Timeout management

### State Management
- TanStack Query for server state
- React Context for auth state
- Optimistic updates
- Automatic cache invalidation

### Logging
- Structured logging with log levels
- Client/server log separation
- Request/response logging
- Authentication event logging

## Development Best Practices

1. **Type Safety**: All code is fully typed with TypeScript
2. **Error Handling**: Comprehensive error handling at all layers
3. **Logging**: Structured logging for debugging
4. **Code Organization**: Feature-based directory structure
5. **Clean Code**: ESLint + Prettier for code quality
6. **Security**: OWASP security best practices

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 9002
lsof -ti:9002 | xargs kill -9
```

### Docker Build Issues
```bash
# Clean build cache
docker-compose down
docker system prune -a
docker-compose build --no-cache
```

### Environment Variables Not Loading
- Ensure `.env` file exists in project root
- Restart development server after changes
- Check environment variable names have `NEXT_PUBLIC_` prefix for client-side access

## Production Deployment

### Using Docker

```bash
# Build production image
docker-compose build

# Start production container
docker-compose up -d

# Check logs
docker-compose logs -f frontend

# Check health
docker-compose ps
```

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm run start
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` to version control
2. **Secrets**: Use strong, unique secrets for JWT keys
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly for API access
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Input Validation**: All user inputs are validated

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and type checking
4. Test thoroughly
5. Create a pull request

## License

Proprietary - All rights reserved

## Support

For support, please contact: support@learnlabz.com

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## Architecture

See [ARCHITECTURE_RECOMMENDATIONS.md](ARCHITECTURE_RECOMMENDATIONS.md) for detailed architecture documentation.

---

**Built with by the LearnLabz Team** 🚀
