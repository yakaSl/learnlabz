'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, UserRole, Permission, LoginRequest, LoginResponse } from '@/types/auth.types';
import { AuthService } from '@/services/auth.service';
import { ROLE_PERMISSIONS } from '@/types/auth.types';
import { AUTH_ROUTES, getDashboardRoute } from '@/config/routes.config';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper functions
  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  }, [user]);

  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  }, [user]);

  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.every(permission => userPermissions.includes(permission));
  }, [user]);

  const isAuthenticated = !!user;

  // Handle logout
  const handleLogout = useCallback(async (redirect: boolean) => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      setUser(null);
      AuthService.clearTokens();
      if (redirect) {
        window.location.href = AUTH_ROUTES.login;
      }
    }
  }, []);

  // CRITICAL: Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");
      
      try {
        // Check if we have a token
        if (!AuthService.hasAuthToken()) {
          console.log("No auth token found");
          setIsLoading(false);
          return;
        }

        console.log("Auth token found, fetching user...");
        
        // Fetch current user
        const response = await AuthService.getCurrentUser();
        
        console.log("User fetch response:", response);
        
        if (response.success && response.data) {
          console.log("User restored from token:", response.data.email);
          setUser(response.data);
        } else {
          console.log("Failed to restore user, clearing tokens");
          await handleLogout(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await handleLogout(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // Run only once on mount

  // Login function
  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await AuthService.login(credentials);

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Login failed');
      }

      const loginData = response.data;

      // Check if 2FA is required
      if (loginData.requiresTwoFactor) {
        return loginData;
      }

      // Set user state
      console.log("Login successful, setting user:", loginData.user.email);
      setUser(loginData.user);

      // Redirect will happen in separate useEffect
      return loginData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  // Handle redirect after login (separate from initialization)
  useEffect(() => {
    // Don't redirect during initial load
    if (isLoading) return;
    
    // Only redirect after explicit login (not on page load)
    if (isAuthenticated && user) {
      // Check if we're on a login page
      const currentPath = window.location.pathname;
      
      if (currentPath === AUTH_ROUTES.login || currentPath === '/register') {
        const redirectParam = searchParams.get('redirect');
        
        if (redirectParam && redirectParam !== AUTH_ROUTES.login) {
          console.log("Redirecting to:", redirectParam);
          router.push(redirectParam);
        } else {
          const dashboardUrl = getDashboardRoute(user.role);
          console.log("Redirecting to dashboard:", dashboardUrl);
          router.push(dashboardUrl);
        }
      }
    }
  }, [isAuthenticated, user, isLoading, searchParams, router]);

  // Logout
  const logout = useCallback(async () => {
    await handleLogout(true);
  }, [handleLogout]);

  // Refresh token
  const refreshToken = useCallback(async () => {
    try {
      await AuthService.refreshToken();
    } catch (error) {
      console.error('Token refresh error:', error);
      await handleLogout(true);
    }
  }, [handleLogout]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAllPermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}