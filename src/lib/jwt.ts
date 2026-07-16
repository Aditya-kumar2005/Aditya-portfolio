import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key'; // Use a fallback for safety
const key = new TextEncoder().encode(secretKey);

// More specific payload type
interface UserJWTPayload {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
  [key: string]: any; // Allow other properties
}

// Renamed from `encrypt` for clarity to `signJWT`
export async function signJWT(payload: UserJWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m') // Set a reasonable expiration time, e.g., 30 minutes
    .sign(key);
}

// Renamed from `decrypt` to `verifyJWT`
export async function verifyJWT(token: string): Promise<UserJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as UserJWTPayload;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("JWT Verification Error:", error);
    return null;
  }
}

/**
 * Updates the session by extending the expiration time of the session token.
 * This should be called in the middleware for any authenticated user activity.
 */
export async function updateSession(request: NextRequest, response: NextResponse, payload: UserJWTPayload) {
  const now = new Date();
  const newExpires = new Date(now.getTime() + 30 * 60 * 1000); // Extend by 30 minutes

  // Re-sign the token with the new expiration time
  const newToken = await signJWT({ ...payload, exp: newExpires.getTime() / 1000 });

  response.cookies.set('session-token', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: newExpires,
    path: '/',
  });

  return response;
}

export default { signJWT, verifyJWT, updateSession };
