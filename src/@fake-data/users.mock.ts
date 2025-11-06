/**
 * Mock User Data
 * Centralized mock data for authentication testing
 * DO NOT use in production - replace with actual database
 */

import { User, UserRole } from '@/types/auth.types';

/**
 * Mock Users Database
 * Email: All users have the same password for testing
 * Password: Test123!
 */
export const MOCK_USERS: Record<string, User> = {
  // Super Admin
  'super@admin.com': {
    id: 'user_sa_001',
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

  // Institute Admin
  'institute@admin.com': {
    id: 'user_ia_001',
    email: 'institute@admin.com',
    firstName: 'Institute',
    lastName: 'Admin',
    role: UserRole.INSTITUTE_ADMIN,
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Teacher
  'teacher@test.com': {
    id: 'user_teacher_001',
    email: 'teacher@test.com',
    firstName: 'John',
    lastName: 'Teacher',
    role: UserRole.TEACHER,
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Tutor Assistant
  // 'assistant@test.com': {
  //   id: 'user_assistant_001',
  //   email: 'assistant@test.com',
  //   firstName: 'Sarah',
  //   lastName: 'Assistant',
  //   role: UserRole.TUTOR_ASSISTANT,
  //   instituteId: 'inst_001',
  //   instituteName: 'Demo Institute',
  //   emailVerified: true,
  //   twoFactorEnabled: false,
  //   isActive: true,
  //   isBlocked: false,
  //   createdAt: new Date('2024-01-01'),
  //   updatedAt: new Date(),
  // },

  // Branch Manager
  'manager@test.com': {
    id: 'user_manager_001',
    email: 'manager@test.com',
    firstName: 'Michael',
    lastName: 'Manager',
    role: UserRole.BRANCH_MANAGER,
    instituteId: 'inst_001',
    branchId: 'branch_001',
    // instituteName: 'Demo Institute',
    // branchName: 'Main Branch',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Accountant
  'accountant@test.com': {
    id: 'user_accountant_001',
    email: 'accountant@test.com',
    firstName: 'Alice',
    lastName: 'Accountant',
    role: UserRole.ACCOUNTANT,
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Coordinator
  'coordinator@test.com': {
    id: 'user_coordinator_001',
    email: 'coordinator@test.com',
    firstName: 'Carol',
    lastName: 'Coordinator',
    role: UserRole.COORDINATOR,
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Student
  'student@test.com': {
    id: 'user_student_001',
    email: 'student@test.com',
    firstName: 'Jane',
    lastName: 'Student',
    role: UserRole.STUDENT,
    globalStudentId: 'STU_GLOBAL_001',
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // Parent
  'parent@test.com': {
    id: 'user_parent_001',
    email: 'parent@test.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    role: UserRole.PARENT,
    emailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // User with 2FA enabled
  '2fa@test.com': {
    id: 'user_2fa_001',
    email: '2fa@test.com',
    firstName: 'TwoFactor',
    lastName: 'User',
    role: UserRole.STUDENT,
    instituteId: 'inst_001',
    // instituteName: 'Demo Institute',
    emailVerified: true,
    twoFactorEnabled: true,
    twoFactorSecret: 'MOCK_2FA_SECRET_KEY',
    isActive: true,
    isBlocked: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
};

/**
 * Mock Password (same for all users for testing)
 * In production, passwords should be hashed with bcrypt
 */
export const MOCK_PASSWORD = 'Test123!';

/**
 * Get user by email
 */
export function getUserByEmail(email: string): User | undefined {
  return MOCK_USERS[email.toLowerCase()];
}

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return Object.values(MOCK_USERS).find(user => user.id === id);
}

/**
 * Validate password (mock implementation)
 */
export function validatePassword(email: string, password: string): boolean {
  const user = getUserByEmail(email);
  if (!user) return false;
  
  // In production, use bcrypt.compare(password, user.hashedPassword)
  return password === MOCK_PASSWORD;
}

/**
 * Get all users by role
 */
export function getUsersByRole(role: UserRole): User[] {
  return Object.values(MOCK_USERS).filter(user => user.role === role);
}