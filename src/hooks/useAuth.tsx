/**
 * useAuth Hook
 * React hook for authentication state management
 */

'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthService, { getAuthErrorMessage } from '@/services/auth.service';
import {
  User,
  AuthContextType,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TwoFactorRequest,
  TwoFactorSetupResponse,
  ResetPasswordConfirmRequest,
  ChangePasswordRequest,
  Session,
  Permission,
  UserRole,
  ROLE_PERMISSIONS,
} from '@/types/auth.types';

// ============================================================================
// AUTH CONTEXT
// ============================================================================

const defaultAuthContext: AuthContextType = {
  user: null,
  isInitialized: false,
  login: async () => { throw new Error('AuthProvider not initialized'); },
  loginWithGoogle: async () => { throw new Error('AuthProvider not initialized'); },
  loginWithFacebook: async () => { throw new Error('AuthProvider not initialized'); },
  logout: async () => { throw new Error('AuthProvider not initialized'); },
  register: async () => { throw new Error('AuthProvider not initialized'); },
  verifyTwoFactor: async () => { throw new Error('AuthProvider not initialized'); },
  setup2FA: async () => { throw new Error('AuthProvider not initialized'); },
  disable2FA: async () => { throw new Error('AuthProvider not initialized'); },
  resetPassword: async () => { throw new Error('AuthProvider not initialized'); },
  confirmResetPassword: async () => { throw new Error('AuthProvider not initialized'); },
  changePassword: async () => { throw new Error('AuthProvider not initialized'); },
  verifyEmail: async () => { throw new Error('AuthProvider not initialized'); },
  resendVerification: async () => { throw new Error('AuthProvider not initialized'); },
  refreshToken: async () => { throw new Error('AuthProvider not initialized'); },
  getSessions: async () => { throw new Error('AuthProvider not initialized'); },
  revokeSession: async () => { throw new Error('AuthProvider not initialized'); },
  hasPermission: () => false,
  hasAnyPermission: () => false,
  hasAllPermissions: () => false,
  hasRole: () => false,
  hasAnyRole: () => false,
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

const roleDashboardPaths: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: '/super-admin',
    [UserRole.INSTITUTE_ADMIN]: '/institute-admin',
    [UserRole.TEACHER]: '/tutor',
    [UserRole.TEACHER_ASSISTANT]: '/tutor-assistant',
    [UserRole.STUDENT]: '/student',
    [UserRole.PARENT]: '/parent',
    [UserRole.BRANCH_MANAGER]: '/branch-manager',
    [UserRole.ACCOUNTANT]: '/accountant',
    [UserRole.COORDINATOR]: '/coordinator',
};

function AuthProviderContent({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initializeAuth = async () => {
        try {
            const response = await AuthService.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            setUser(null);
        } finally {
            setIsInitialized(true);
        }
    };
    initializeAuth();
  }, []);
  
  const handleSuccessfulAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    const redirectTo = searchParams.get('redirect') || roleDashboardPaths[authenticatedUser.role] || '/';
    router.push(redirectTo);
  };
  
  /**
   * Login with email and password
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await AuthService.login(credentials);

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      const loginData = response.data;

      // Check if 2FA is required
      if (loginData.requiresTwoFactor) {
        return loginData; // Return with 2FA session ID
      }
      
      const loggedInUser = loginData.user;
      handleSuccessfulAuth(loggedInUser);

      return loginData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [handleSuccessfulAuth]);

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = useCallback(async (): Promise<void> => {
    try {
      const response = await AuthService.loginWithGoogle();
      
      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Redirect to Google OAuth URL
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }, []);

  /**
   * Login with Facebook OAuth
   */
  const loginWithFacebook = useCallback(async (): Promise<void> => {
    try {
      const response = await AuthService.loginWithFacebook();
      
      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Redirect to Facebook OAuth URL
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      await AuthService.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state and redirect
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  /**
   * Register new user
   */
  const register = useCallback(async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await AuthService.register(userData);

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      const registeredUser = response.data.user;
      handleSuccessfulAuth(registeredUser);

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [handleSuccessfulAuth]);

  /**
   * Verify 2FA code
   */
  const verifyTwoFactor = useCallback(async (twoFactorData: TwoFactorRequest): Promise<LoginResponse> => {
    try {
      const response = await AuthService.verifyTwoFactor(twoFactorData);

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      const loggedInUser = response.data.user;
      handleSuccessfulAuth(loggedInUser);

      return response.data;
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
    }
  }, [handleSuccessfulAuth]);

  /**
   * Setup 2FA
   */
  const setup2FA = useCallback(async (): Promise<TwoFactorSetupResponse> => {
    try {
      const response = await AuthService.setup2FA();

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      return response.data;
    } catch (error) {
      console.error('2FA setup error:', error);
      throw error;
    }
  }, []);

  /**
   * Disable 2FA
   */
  const disable2FA = useCallback(async (): Promise<void> => {
    try {
      const response = await AuthService.disable2FA();

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Update user state to reflect 2FA disabled
      if (user) {
        setUser({ ...user, twoFactorEnabled: false });
      }
    } catch (error) {
      console.error('2FA disable error:', error);
      throw error;
    }
  }, [user]);

  /**
   * Request password reset
   */
  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      const response = await AuthService.resetPassword(email);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }, []);

  /**
   * Confirm password reset with token
   */
  const confirmResetPassword = useCallback(async (data: ResetPasswordConfirmRequest): Promise<void> => {
    try {
      const response = await AuthService.confirmResetPassword(data);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw error;
    }
  }, []);

  /**
   * Change password
   */
  const changePassword = useCallback(async (data: ChangePasswordRequest): Promise<void> => {
    try {
      const response = await AuthService.changePassword(data);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }, []);

  /**
   * Verify email with token
   */
  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    try {
      const response = await AuthService.verifyEmail(token);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Update user state to reflect verified email
      if (user) {
        setUser({ ...user, emailVerified: true });
      }
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }, [user]);

  /**
   * Resend verification email
   */
  const resendVerification = useCallback(async (): Promise<void> => {
    try {
      const response = await AuthService.resendVerification();

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  }, []);

  /**
   * Refresh access token
   */
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      const response = await AuthService.refreshToken();

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }, []);

  /**
   * Get active sessions
   */
  const getSessions = useCallback(async (): Promise<Session[]> => {
    try {
      const response = await AuthService.getSessions();

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      return response.data;
    } catch (error) {
      console.error('Get sessions error:', error);
      throw error;
    }
  }, []);

  /**
   * Revoke a specific session
   */
  const revokeSession = useCallback(async (sessionId: string): Promise<void> => {
    try {
      const response = await AuthService.revokeSession(sessionId);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Revoke session error:', error);
      throw error;
    }
  }, []);

  /**
   * Check if user has specific permission
   */
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  }, [user]);

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.some(p => userPermissions.includes(p));
  }, [user]);

  /**
   * Check if user has all specified permissions
   */
  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.every(p => userPermissions.includes(p));
  }, [user]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  }, [user]);

  // Add token refresh interval
  useEffect(() => {
    if (!user) return;

    // Refresh token every 14 minutes (assuming 15 min token expiry)
    const refreshInterval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // If refresh fails, logout user
        await logout();
      }
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(refreshInterval);
  }, [user, refreshToken, logout]);

  // Context value
  const value: AuthContextType = {
    user,
    isInitialized,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    register,
    verifyTwoFactor,
    setup2FA,
    disable2FA,
    resetPassword,
    confirmResetPassword,
    changePassword,
    verifyEmail,
    resendVerification,
    refreshToken,
    getSessions,
    revokeSession,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

// ============================================================================
// USEAUTH HOOK
// ============================================================================

/**
 * Hook to access authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// ============================================================================
// EXPORT
// ============================================================================

export default useAuth;