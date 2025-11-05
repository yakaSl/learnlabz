'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FaExclamationTriangle } from 'react-icons/fa';
import { UserRole } from '@/types/auth.types';
import Link from 'next/link';
import { Suspense } from 'react';

function UnauthorizedContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const handleGoBack = () => {
    // If 'from' is provided and is a valid relative path, go there.
    // Otherwise, go back in history or to the dashboard.
    if (from && from.startsWith('/')) {
      router.push(from);
    } else {
      router.back();
    }
  };
  
  const getDashboardUrl = (role: UserRole): string => {
    const roleMap: Record<string, string> = {
      [UserRole.SUPER_ADMIN]: '/super-admin',
      [UserRole.INSTITUTE_ADMIN]: '/institute-admin',
      [UserRole.TEACHER]: '/tutor',
      [UserRole.BRANCH_MANAGER]: '/branch-manager',
      [UserRole.ACCOUNTANT]: '/accountant',
      [UserRole.COORDINATOR]: '/coordinator',
      [UserRole.STUDENT]: '/student',
      [UserRole.PARENT]: '/parent',
    };
  
    return roleMap[role] || '/';
  }

  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
          <FaExclamationTriangle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Denied</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {isAuthenticated
            ? "You don't have permission to access this page."
            : "You need to be logged in to access this page."}
        </p>

        <div className="space-y-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleGoBack}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go Back
              </button>
              
              {user && (
                <Link
                  href={getDashboardUrl(user.role)}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Need help?{' '}
          <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}


export default function UnauthorizedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnauthorizedContent />
        </Suspense>
    )
}
