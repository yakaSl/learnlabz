/**
 * useAuth Hook (Updated for Real Backend)
 * Provides authentication context and methods
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  UserRole,
  Permission,
  ROLE_PERMISSIONS,
} from '@/types/auth.types';
import { AuthService } from '@/services/auth.service';
import { getDashboardRoute } from '@/config/routes.config';
import { logger } from '@/lib/logger';

// =============================================================================
// CONTEXT TYPE
// =============================================================================

interface AuthContextType {
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;

  // Auth methods
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Permission checks
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;

  // Utility
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ===========================================================================
  // INITIALIZE AUTH STATE
  // ===========================================================================

  useEffect(() => {
    const initializeAuth = async () => {
      logger.auth('Initializing auth state');

      try {
        if (!AuthService.hasAuthToken()) {
          logger.auth('No auth token found');
          setIsInitialized(true);
          return;
        }

        logger.auth('Auth token found, fetching user');
        const response = await AuthService.getCurrentUser();

        if (response.success && response.user) {
          logger.auth('User restored from token', {
            userId: response.user.id,
            role: response.user.role,
          });
          setUser(response.user);
        } else {
          logger.warn('Failed to restore user from /me endpoint', { error: response.error });
          logger.warn('Creating minimal user object from cookies');

          // Create minimal user object from cookies to allow dashboard access
          const roleFromCookie = AuthService.getUserRole();
          if (roleFromCookie) {
            const minimalUser: User = {
              id: 'temp-id',
              username: 'user',
              personId: 'temp-person-id',
              email: 'user@learnlabz.com',
              firstName: 'User',
              lastName: '',
              role: roleFromCookie,
              primaryRole: {
                categoryCode: roleFromCookie,
                categoryName: roleFromCookie.replace('_', ' '),
                isGlobal: false,
              },
              hasGlobalAccess: false,
              isActive: true,
              isBlocked: false,
              emailVerified: false,
              twoFactorEnabled: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            setUser(minimalUser);
            logger.auth('Minimal user object created', { role: roleFromCookie });
          }
        }
      } catch (error) {
        logger.error('Auth initialization error', { error });
        logger.warn('User will remain authenticated despite initialization error');
        // Don't clear tokens on error - middleware will handle invalid tokens
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // ===========================================================================
  // PERMISSION & ROLE HELPERS
  // ===========================================================================

  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return user?.role === role;
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles: UserRole[]): boolean => {
      return user ? roles.includes(user.role) : false;
    },
    [user]
  );

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!user) return false;
      const userPermissions = ROLE_PERMISSIONS[user.role] || [];
      return userPermissions.includes(permission);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]): boolean => {
      if (!user) return false;
      const userPermissions = ROLE_PERMISSIONS[user.role] || [];
      return permissions.some((permission) => userPermissions.includes(permission));
    },
    [user]
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]): boolean => {
      if (!user) return false;
      const userPermissions = ROLE_PERMISSIONS[user.role] || [];
      return permissions.every((permission) => userPermissions.includes(permission));
    },
    [user]
  );

  // ===========================================================================
  // AUTH METHODS
  // ===========================================================================

  /**
   * Login with username/email and password
   */
  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      logger.auth('Login attempt', { username });

      try {
        const response = await AuthService.login(username, password);

        if (response.success && response.user) {
          logger.auth('Login successful', {
            userId: response.user.id,
            role: response.user.role,
          });
          setUser(response.user);

          // Redirect to dashboard
          const dashboardUrl = getDashboardRoute(response.user.role);
          logger.auth('Redirecting to dashboard', { dashboardUrl });
          router.push(dashboardUrl);

          return { success: true };
        } else {
          logger.auth('Login failed', { error: response.error });
          return {
            success: false,
            error: response.error || 'Login failed',
          };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        logger.error('Login error', { error: errorMessage });
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    logger.auth('Logout attempt');

    try {
      await AuthService.logout();
      setUser(null);
      logger.auth('Logout successful');
      window.location.href = '/login';
    } catch (error) {
      logger.error('Logout error', { error });
      // Still clear user and redirect even if API call fails
      setUser(null);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async () => {
    logger.auth('Refreshing user data');

    try {
      const response = await AuthService.getCurrentUser();

      if (response.success && response.user) {
        logger.auth('User data refreshed');
        setUser(response.user);
      } else {
        logger.warn('Failed to refresh user data');
      }
    } catch (error) {
      logger.error('Refresh user error', { error });
    }
  }, []);

  // ===========================================================================
  // CONTEXT VALUE
  // ===========================================================================

  const value: AuthContextType = {
    user,
    isInitialized,
    isLoading,

    // Auth methods
    login,
    logout,

    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,

    // Utility
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================================================
// HOOK
// =============================================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
