
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    let user;
    let role = 'USER';

    if (email === 'nanuadityakumar@gmail.com') {
      const adminPassword = process.env.ADMIN_PASSWORD || 'password';
      if (password === adminPassword) {
        role = 'ADMIN';
        user = { id: 'admin', email, name: 'Admin' };
      } else {
        return new NextResponse('Invalid credentials', { status: 401 });
      }
    } else {
      user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return new NextResponse('Invalid credentials', { status: 401 });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return new NextResponse('Invalid credentials', { status: 401 });
      }
    }

    const token = sign({ userId: user.id, role, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    cookies().set('session-token', token, { httpOnly: true });

    return NextResponse.json({ message: 'Logged in successfully' });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
