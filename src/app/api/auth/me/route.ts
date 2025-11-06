/**
 * API Route: /api/auth/me
 * Retrieves the currently authenticated user's information.
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/lib/auth';
import { User, UserRole } from '@/types/auth.types';

// Mock user database (replace with real database in production)
const MOCK_USERS: Record<string, User> = {
  '1': {
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
  '2': {
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
  '3': {
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
  '4': {
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
  '5': {
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


export async function GET() {
  try {
    const session = await getCurrentUser();

    if (!session || !session.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHENTICATED', message: 'No active session' } },
        { status: 401 }
      );
    }
    
    // In a real application, you would fetch the full user object from your database
    // using the session.userId
    const user = MOCK_USERS[session.userId];

    if (!user) {
         return NextResponse.json(
            { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
            { status: 404 }
        );
    }
    
    // Omit sensitive data before sending
    const { twoFactorSecret, ...safeUser } = user;

    return NextResponse.json({ success: true, data: safeUser });

  } catch (error) {
    console.error('/api/auth/me error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
      },
      { status: 500 }
    );
  }
}
