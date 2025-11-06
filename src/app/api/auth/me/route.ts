import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, AUTH_CONFIG } from '@/app/lib/auth';
import { getUserById } from '@fake-data';

export async function GET(request: NextRequest) {
  try {
    console.log("=== /api/auth/me called ===");
    
    // Get all cookies for debugging
    const allCookies = request.cookies.getAll();
    console.log("All cookies:", allCookies);
    
    // Get token from cookies
    const token = request.cookies.get(AUTH_CONFIG.cookies.accessToken)?.value;
    console.log("Access token:", token ? "Found" : "Not found");

    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'UNAUTHORIZED', 
            message: 'No token provided' 
          } 
        },
        { status: 401 }
      );
    }

    // Verify the token
    console.log("Verifying token...");
    const payload = await verifyAccessToken(token);
    console.log("Token verified, user ID:", payload.userId);
    
    // Get user from mock database
    const user = getUserById(payload.userId);

    if (!user) {
      console.log("User not found:", payload.userId);
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'USER_NOT_FOUND', 
            message: 'User not found' 
          } 
        },
        { status: 404 }
      );
    }

    // Check if user is active
    if (!user.isActive || user.isBlocked) {
      console.log("User account is disabled");
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'ACCOUNT_DISABLED', 
            message: 'Your account has been disabled' 
          } 
        },
        { status: 403 }
      );
    }

    console.log("Returning user data:", user.email);

    // Return user data (without sensitive fields)
    return NextResponse.json({
      success: true,
      data: {
        ...user,
        twoFactorSecret: undefined,
      },
    });

  } catch (error) {
    console.error('Get current user error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Invalid or expired token' 
        } 
      },
      { status: 401 }
    );
  }
}