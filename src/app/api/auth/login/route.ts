/**
 * Login API Route (Modified)
 * Uses centralized mock data from @fake-data
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateTokenPair,
  setAuthCookies,
  generateSessionId,
  generate2FASessionToken,
} from "@/app/lib/auth";
import { LoginRequest, LoginResponse } from "@/types/auth.types";
import { getUserByEmail, validatePassword } from "@fake-data";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body: LoginRequest = await request.json();
    const { email, password, remember } = body;

    // 2. Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Email and password are required",
          },
        },
        { status: 400 }
      );
    }

    // 3. Find user by email
    const user = getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    }

    // 4. Validate password
    if (!validatePassword(email, password)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    }

    // 5. Check if account is active
    if (!user.isActive || user.isBlocked) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ACCOUNT_DISABLED",
            message: "Your account has been disabled. Please contact support.",
          },
        },
        { status: 403 }
      );
    }

    // 6. Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMAIL_NOT_VERIFIED",
            message: "Please verify your email address before logging in.",
          },
        },
        { status: 403 }
      );
    }

    // 7. Handle 2FA if enabled
    if (user.twoFactorEnabled) {
      // Generate temporary 2FA session token
      const twoFactorToken = generate2FASessionToken(user.id, user.email);

      return NextResponse.json({
        success: true,
        data: {
          requiresTwoFactor: true,
          twoFactorToken,
          email: user.email,
        },
      });
    }

    // 8. Generate session and tokens
    const sessionId = generateSessionId();
    // const { accessToken, refreshToken } = generateTokenPair({
    //   userId: user.id,
    //   email: user.email,
    //   role: user.role,
    //   sessionId,
    //   instituteId: user.instituteId,
    //   branchId: user.branchId,
    // });
    const tokenPair = await generateTokenPair({
      user: user,
      sessionId: sessionId,
      remember: remember ? true : false,
    });

    // 9. Create response
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          ...user,
          // Don't send sensitive data
          twoFactorSecret: undefined,
        },
        tokens: tokenPair,
        requiresTwoFactor: false,
      } as LoginResponse,
    });
console.log("tokenPair",tokenPair);

    // 10. Set auth cookies
    setAuthCookies(response, tokenPair);

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred during login. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}
