
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (email === 'nanuadityakumar@gmail.com') {
      return new NextResponse('Admin user cannot be registered', { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
