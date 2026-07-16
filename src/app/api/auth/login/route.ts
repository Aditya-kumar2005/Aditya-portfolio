import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/lib/jwt';

const ADMIN_EMAIL = 'nanuadityakumar@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdityaLab@2026';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const emailClean = String(email).trim().toLowerCase();

    // 1. Check if Admin Login
    if (emailClean === ADMIN_EMAIL) {
      if (password === ADMIN_PASSWORD) {
        const payload = {
          id: 'admin-id',
          email: ADMIN_EMAIL,
          name: 'Aditya Kumar',
          role: 'ADMIN',
        };

        const token = await signJWT(payload);
        const response = NextResponse.json({
          message: 'Admin signed in successfully',
          user: payload,
        });

        // Set secure HTTP-only cookie
        response.cookies.set({
          name: 'session-token',
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      } else {
        return NextResponse.json(
          { error: 'Invalid admin credentials' },
          { status: 401 }
        );
      }
    }

    // 2. Regular User Login
    const user = await prisma.user.findUnique({
      where: { email: emailClean },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name || 'User',
      role: 'USER',
    };

    const token = await signJWT(payload);
    const response = NextResponse.json({
      message: 'Login successful',
      user: payload,
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'session-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
