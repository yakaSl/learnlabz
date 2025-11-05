/**
 * Login API Route Example
 * This is an example implementation of the login endpoint
 * 
 * NOTE: This is a MOCK implementation for demonstration.
 * In production, you would:
 * 1. Validate credentials against a real database
 * 2. Hash passwords with bcrypt
 * 3. Implement proper error handling
 * 4. Add rate limiting
 * 5. Add security logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  generateTokenPair, 
  setAuthCookies, 
  generateSessionId,
  generate2FASessionToken 
} from '@/app/lib/auth';
import { LoginRequest, LoginResponse, User, UserRole } from '@/types/auth.types';

// Mock user database (replace with real database in production)
const MOCK_USERS: Record<string, User> = {
  'super@admin.com': {
    id: '1',
    email: 'super@admin.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: UserRole.SUPER_ADMIN,
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  'institute@admin.com': {
    id: '2',
    email: 'institute@admin.com',
    firstName: 'Institute',
    lastName: 'Admin',
    role: UserRole.INSTITUTE_ADMIN,
    instituteId: 'inst_001',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  'teacher@test.com': {
    id: '3',
    email: 'teacher@test.com',
    firstName: 'John',
    lastName: 'Teacher',
    role: UserRole.TEACHER,
    instituteId: 'inst_001',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  'student@test.com': {
    id: '4',
    email: 'student@test.com',
    firstName: 'Jane',
    lastName: 'Student',
    role: UserRole.STUDENT,
    globalStudentId: 'STU_GLOBAL_001',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  '2fa@test.com': {
    id: '5',
    email: '2fa@test.com',
    firstName: 'TwoFactor',
    lastName: 'User',
    role: UserRole.STUDENT,
    emailVerified: true,
    twoFactorEnabled: true,
    twoFactorSecret: 'MOCK_2FA_SECRET',
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
};

// Mock password (in production, use bcrypt to hash and compare)
const MOCK_PASSWORD = 'Test123!';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: LoginRequest = await request.json();
    const { email, password, remember } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Email and password are required',
          },
        },
        { status: 400 }
      );
    }

    // Find user (in production, query database)
    const user = MOCK_USERS[email.toLowerCase()];

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // Verify password (in production, use bcrypt.compare)
    if (password !== MOCK_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // Check if account is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_BLOCKED',
            message: 'Your account has been blocked. Please contact support.',
          },
        },
        { status: 403 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_INACTIVE',
            message: 'Your account is inactive. Please contact support.',
          },
        },
        { status: 403 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_NOT_VERIFIED',
            message: 'Please verify your email address',
          },
        },
        { status: 403 }
      );
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate temporary 2FA session token
      const twoFactorSessionId = await generate2FASessionToken(user.id, user.email);

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          requiresTwoFactor: true,
          twoFactorSessionId,
        } as LoginResponse,
      });
    }

    // Generate session ID
    const sessionId = generateSessionId();

    // Generate tokens
    const tokens = await generateTokenPair(user, sessionId, remember);

    // Set auth cookies
    await setAuthCookies(tokens);

    // In production, save session to database
    // await saveSession({
    //   id: sessionId,
    //   userId: user.id,
    //   refreshToken: tokens.refreshToken,
    //   userAgent: request.headers.get('user-agent') || '',
    //   ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // });

    // Update last login time in database
    // await updateUserLastLogin(user.id);

    // Return success response
    const response: LoginResponse = {
      user: {
        ...user,
        // Don't send sensitive data to client
        twoFactorSecret: undefined,
      },
      tokens,
    };

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}