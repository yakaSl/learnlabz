"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  User,
  UserRole,
  Permission,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TwoFactorRequest,
  TwoFactorSetupResponse,
  ResetPasswordConfirmRequest,
  ChangePasswordRequest,
  Session,
  AuthContextType,
  ROLE_PERMISSIONS,
} from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";
import { getDashboardRoute } from "@/config/routes.config";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ============================================================================
  // PERMISSION & ROLE HELPERS
  // ============================================================================

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
      return permissions.some((permission) =>
        userPermissions.includes(permission)
      );
    },
    [user]
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]): boolean => {
      if (!user) return false;
      const userPermissions = ROLE_PERMISSIONS[user.role] || [];
      return permissions.every((permission) =>
        userPermissions.includes(permission)
      );
    },
    [user]
  );

  // ============================================================================
  // INITIALIZE AUTH STATE ON MOUNT
  // ============================================================================

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 Initializing auth...");
      console.log("AuthService.hasAuthToken()", AuthService.hasAuthToken());

      try {
        // Check if we have cookies
        if (!AuthService.hasAuthToken()) {
          console.log("❌ No auth token found");
          setIsLoading(false);
          return;
        }

        console.log("✅ Auth token found, fetching user from /api/auth/me");
        const response = await AuthService.getCurrentUser();

        console.log("📦 API Response:", response);

        if (response.success && response.data) {
          console.log("✅ User restored:", response.data.email);
          setUser(response.data);
        } else {
          console.log("❌ Failed to get user, clearing tokens");
          AuthService.clearTokens();
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error);
        AuthService.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ============================================================================
  // AUTH METHODS - LOGIN
  // ============================================================================

  const login = useCallback(
    async (credentials: LoginRequest): Promise<LoginResponse> => {
      try {
        const response = await AuthService.login(credentials);

        if (!response.success || !response.data) {
          throw new Error(response.error?.message || "Login failed");
        }

        const loginData = response.data;

        if (loginData.requiresTwoFactor) {
          return loginData;
        }

        console.log("✅ Login successful, setting user:", loginData.user.email);
        setUser(loginData.user);

        // Redirect to dashboard
        const dashboardUrl = getDashboardRoute(loginData.user.role);
        console.log("🔀 Redirecting to:", dashboardUrl);
        router.push(dashboardUrl);

        return loginData;
      } catch (error) {
        console.error("❌ Login error:", error);
        throw error;
      }
    },
    [router]
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      console.log("🔐 Google login requested");
      await AuthService.loginWithGoogle();
    } catch (error) {
      console.error("❌ Google login error:", error);
      throw error;
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    try {
      console.log("🔐 Facebook login requested");
      await AuthService.loginWithFacebook();
    } catch (error) {
      console.error("❌ Facebook login error:", error);
      throw error;
    }
  }, []);

  // ============================================================================
  // AUTH METHODS - LOGOUT
  // ============================================================================

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      setUser(null);
      AuthService.clearTokens();
      window.location.href = "/login";
    }
  }, []);

  // ============================================================================
  // AUTH METHODS - REGISTER
  // ============================================================================

  const register = useCallback(
    async (data: RegisterRequest): Promise<RegisterResponse> => {
      try {
        const response = await AuthService.register(data);

        if (!response.success || !response.data) {
          throw new Error(response.error?.message || "Registration failed");
        }

        const registerData = response.data;
        console.log("✅ Registration successful:", registerData.user.email);
        setUser(registerData.user);

        // Redirect to dashboard
        const dashboardUrl = getDashboardRoute(registerData.user.role);
        router.push(dashboardUrl);

        return registerData;
      } catch (error) {
        console.error("❌ Registration error:", error);
        throw error;
      }
    },
    [router]
  );

  // ============================================================================
  // AUTH METHODS - TWO FACTOR AUTHENTICATION
  // ============================================================================

  const verifyTwoFactor = useCallback(
    async (data: TwoFactorRequest): Promise<LoginResponse> => {
      try {
        const response = await AuthService.verifyTwoFactor(data);

        if (!response.success || !response.data) {
          throw new Error(response.error?.message || "2FA verification failed");
        }

        const loginData = response.data;
        console.log("✅ 2FA verified:", loginData.user.email);
        setUser(loginData.user);

        // Redirect to dashboard
        const dashboardUrl = getDashboardRoute(loginData.user.role);
        router.push(dashboardUrl);

        return loginData;
      } catch (error) {
        console.error("❌ 2FA verification error:", error);
        throw error;
      }
    },
    [router]
  );

  const setup2FA = useCallback(async (): Promise<TwoFactorSetupResponse> => {
    try {
      const response = await AuthService.setup2FA();

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "2FA setup failed");
      }

      return response.data;
    } catch (error) {
      console.error("❌ 2FA setup error:", error);
      throw error;
    }
  }, []);

  const disable2FA = useCallback(async () => {
    try {
      const response = await AuthService.disable2FA();

      if (!response.success) {
        throw new Error(response.error?.message || "2FA disable failed");
      }

      console.log("✅ 2FA disabled");
    } catch (error) {
      console.error("❌ 2FA disable error:", error);
      throw error;
    }
  }, []);

  // ============================================================================
  // AUTH METHODS - PASSWORD MANAGEMENT
  // ============================================================================

  const resetPassword = useCallback(async (email: string) => {
    try {
      const response = await AuthService.forgotPassword(email);

      if (!response.success) {
        throw new Error(
          response.error?.message || "Password reset request failed"
        );
      }

      console.log("✅ Password reset email sent");
    } catch (error) {
      console.error("❌ Password reset error:", error);
      throw error;
    }
  }, []);

  const confirmResetPassword = useCallback(
    async (data: ResetPasswordConfirmRequest) => {
      try {
        const response = await AuthService.resetPassword(data);

        if (!response.success) {
          throw new Error(response.error?.message || "Password reset failed");
        }

        console.log("✅ Password reset successful");
      } catch (error) {
        console.error("❌ Password reset confirmation error:", error);
        throw error;
      }
    },
    []
  );

  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    try {
      const response = await AuthService.changePassword(data);

      if (!response.success) {
        throw new Error(response.error?.message || "Password change failed");
      }

      console.log("✅ Password changed successfully");
    } catch (error) {
      console.error("❌ Password change error:", error);
      throw error;
    }
  }, []);

  // ============================================================================
  // AUTH METHODS - EMAIL VERIFICATION
  // ============================================================================

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await AuthService.verifyEmail(token);

      if (!response.success) {
        throw new Error(response.error?.message || "Email verification failed");
      }

      console.log("✅ Email verified");
    } catch (error) {
      console.error("❌ Email verification error:", error);
      throw error;
    }
  }, []);

  const resendVerification = useCallback(async () => {
    try {
      const response = await AuthService.resendVerification();

      if (!response.success) {
        throw new Error(
          response.error?.message || "Resend verification failed"
        );
      }

      console.log("✅ Verification email resent");
    } catch (error) {
      console.error("❌ Resend verification error:", error);
      throw error;
    }
  }, []);

  // ============================================================================
  // AUTH METHODS - TOKEN & SESSION MANAGEMENT
  // ============================================================================

  const refreshToken = useCallback(async () => {
    try {
      const response = await AuthService.refreshToken();

      if (!response.success) {
        throw new Error("Token refresh failed");
      }

      console.log("✅ Token refreshed");
    } catch (error) {
      console.error("❌ Token refresh error:", error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  }, [logout]);

  const getSessions = useCallback(async (): Promise<Session[]> => {
    try {
      const response = await AuthService.getSessions();

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to get sessions");
      }

      return response.data;
    } catch (error) {
      console.error("❌ Get sessions error:", error);
      throw error;
    }
  }, []);

  const revokeSession = useCallback(async (sessionId: string) => {
    try {
      const response = await AuthService.revokeSession(sessionId);

      if (!response.success) {
        throw new Error(response.error?.message || "Failed to revoke session");
      }

      console.log("✅ Session revoked:", sessionId);
    } catch (error) {
      console.error("❌ Revoke session error:", error);
      throw error;
    }
  }, []);

  // ============================================================================
  // CONTEXT VALUE - MATCHES AuthContextType INTERFACE EXACTLY
  // ============================================================================

  const value: AuthContextType = {
    // State
    user,
    isInitialized: !isLoading,

    // Auth methods
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    register,

    // 2FA methods
    verifyTwoFactor,
    setup2FA,
    disable2FA,

    // Password methods
    resetPassword,
    confirmResetPassword,
    changePassword,

    // Email verification
    verifyEmail,
    resendVerification,

    // Token & Session management
    refreshToken,
    getSessions,
    revokeSession,

    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
