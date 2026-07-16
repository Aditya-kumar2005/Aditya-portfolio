
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { signJWT } from '@/lib/jwt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    let user: { id: string; email: string; name: string | null };
    let role: 'USER' | 'ADMIN' = 'USER';

    if (email === process.env.ADMIN_EMAIL) {
      if (password === process.env.ADMIN_PASSWORD) {
        role = 'ADMIN';
        user = { id: 'admin', email, name: 'Admin' };
      } else {
        return new NextResponse('Invalid credentials', { status: 401 });
      }
    } else {
      const foundUser = await prisma.user.findUnique({ where: { email } });

      if (!foundUser) {
        return new NextResponse('Invalid credentials', { status: 401 });
      }

      const isPasswordValid = await compare(password, foundUser.password);

      if (!isPasswordValid) {
        return new NextResponse('Invalid credentials', { status: 401 });
      }
      user = foundUser;
    }

    // Create the token using the consistent signJWT function
    const token = await signJWT({
      id: user.id,
      role,
      email: user.email,
    });

    const response = NextResponse.json({ message: 'Logged in successfully' });

    // Set the cookie on the response
    response.cookies.set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // The expiration is set within the JWT, but you can also set it on the cookie
      // maxAge: 60 * 30, // 30 minutes
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    return new NextResponse('An internal server error occurred', { status: 500 });
  }
}
