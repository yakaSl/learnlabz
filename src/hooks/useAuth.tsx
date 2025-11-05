/**
 * useAuth Hook
 * React hook for authentication state management
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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
  isAuthenticated: false,
  isLoading: true,
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

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);
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
    [UserRole.STUDENT]: '/student',
    [UserRole.PARENT]: '/parent',
    [UserRole.BRANCH_MANAGER]: '/branch-manager',
    [UserRole.ACCOUNTANT]: '/accountant',
    [UserRole.COORDINATOR]: '/coordinator',
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AuthService.logout(); // Clear cookies on server
    router.push('/login');
  }, [router]);
  
  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
        try {
        if (AuthService.isAuthenticated()) {
            const response = await AuthService.getCurrentUser();
            
            if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
            } else {
            // Token exists but is invalid
            await handleLogout();
            }
        }
        } catch (error) {
            console.error('Auth initialization error:', error);
            await handleLogout();
        } finally {
        setIsLoading(false);
        }
    };
    initializeAuth();
  }, [handleLogout]);

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

      // Update state
      setUser(loginData.user);
      setIsAuthenticated(true);

      return loginData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  /**
   * Login with Google
   */
  const loginWithGoogle = useCallback(async () => {
    try {
      // AuthService.loginWithGoogle will redirect to OAuth flow
      await AuthService.loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }, []);

  /**
   * Login with Facebook
   */
  const loginWithFacebook = useCallback(async () => {
    try {
      await AuthService.loginWithFacebook();
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  }, []);

  /**
   * Verify 2FA code
   */
  const verifyTwoFactor = useCallback(async (data: TwoFactorRequest): Promise<LoginResponse> => {
    try {
      const response = await AuthService.verifyTwoFactor(data);

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'INVALID_2FA_CODE'));
      }

      const loginData = response.data;
      setUser(loginData.user);
      setIsAuthenticated(true);
      
      return loginData;
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
    }
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await AuthService.register(data);

      if (!response.success || !response.data) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      const registerData = response.data;
      setUser(registerData.user);
      setIsAuthenticated(true);

      return registerData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      await handleLogout();
    }
  }, [handleLogout]);

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
  const disable2FA = useCallback(async () => {
    try {
      const response = await AuthService.disable2FA();

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Update user state
      if (user) {
        setUser({ ...user, twoFactorEnabled: false });
      }
    } catch (error) {
      console.error('2FA disable error:', error);
      throw error;
    }
  }, [user]);

  /**
   * Reset password
   */
  const resetPassword = useCallback(async (email: string) => {
    try {
      const response = await AuthService.forgotPassword(email);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }, []);

  /**
   * Confirm password reset with token
   */
  const confirmResetPassword = useCallback(async (data: ResetPasswordConfirmRequest) => {
    try {
      const response = await AuthService.resetPassword(data);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      router.push('/login');
    } catch (error) {
      console.error('Confirm reset password error:', error);
      throw error;
    }
  }, [router]);

  /**
   * Change password
   */
  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    try {
      const response = await AuthService.changePassword(data);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }, []);

  /**
   * Verify email
   */
  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await AuthService.verifyEmail(token);

      if (!response.success) {
        throw new Error(getAuthErrorMessage(response.error?.code || 'UNKNOWN_ERROR'));
      }

      // Update user state
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
  const resendVerification = useCallback(async () => {
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
  const refreshToken = useCallback(async () => {
    try {
      const response = await AuthService.refreshToken();

      if (!response.success) {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await handleLogout();
    }
  }, [handleLogout]);

  /**
   * Get user sessions
   */
  const getSessions = useCallback(async (): Promise<Session[]> => {
    try {
      const response = await AuthService.getSessions();

      if (!response.success || !response.data) {
        throw new Error('Failed to fetch sessions');
      }

      return response.data;
    } catch (error) {
      console.error('Get sessions error:', error);
      return [];
    }
  }, []);

  /**
   * Revoke a session
   */
  const revokeSession = useCallback(async (sessionId: string) => {
    try {
      const response = await AuthService.revokeSession(sessionId);

      if (!response.success) {
        throw new Error('Failed to revoke session');
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

  // Context value
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
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

// ============================================================================
// USEAUTH HOOK
// ============================================================================

/**
 * Hook to access authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === defaultAuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// ============================================================================
// EXPORT
// ============================================================================

export default useAuth;
