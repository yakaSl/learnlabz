/**
 * Login Page Component
 * Comprehensive login interface with email/password, social auth, and 2FA support
 */

'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequest } from '@/types/auth.types';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function LoginPage() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorSessionId, setTwoFactorSessionId] = useState<string | null>(null);

  const { login, loginWithGoogle, loginWithFacebook, verifyTwoFactor } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  /**
   * Handle form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  /**
   * Handle email/password login
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      // Check if 2FA is required
      if (response.requiresTwoFactor && response.twoFactorSessionId) {
        setShow2FA(true);
        setTwoFactorSessionId(response.twoFactorSessionId);
      } else {
        // Login successful, redirect handled by useAuth
        if (redirectTo !== '/') {
          router.push(redirectTo);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle 2FA verification
   */
  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twoFactorSessionId) {
      setError('Invalid session. Please try logging in again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyTwoFactor({
        sessionId: twoFactorSessionId,
        code: twoFactorCode,
      });

      // 2FA successful, redirect handled by useAuth
      if (redirectTo !== '/') {
        router.push(redirectTo);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '2FA verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Google login
   */
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setError('Google login failed');
      setIsLoading(false);
    }
  };

  /**
   * Handle Facebook login
   */
  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithFacebook();
    } catch (err) {
      setError('Facebook login failed');
      setIsLoading(false);
    }
  };

  /**
   * Render 2FA form
   */
  if (show2FA) {
    return (
      <AuthLayout title="Two-Factor Authentication" description="Enter the 6-digit code from your authenticator app.">
          <form className="space-y-6" onSubmit={handle2FASubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="twoFactorCode" className="sr-only">
                2FA Code
              </Label>
              <Input
                id="twoFactorCode"
                name="twoFactorCode"
                type="text"
                maxLength={6}
                required
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading || twoFactorCode.length !== 6}
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShow2FA(false);
                  setTwoFactorCode('');
                  setTwoFactorSessionId(null);
                  setError(null);
                }}
              >
                Back to login
              </Button>
            </div>
          </form>
      </AuthLayout>
    );
  }

  /**
   * Render login form
   */
  return (
    <AuthLayout title="Sign in to LearnLabz" description="Enter your credentials to access your account.">
      <div className="space-y-6">
        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleFacebookLogin}
            disabled={isLoading}
          >
            <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
            Facebook
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
               <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                 <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remember: !!checked }))}
              />
              <Label htmlFor="remember" className="ml-2 font-normal">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}
