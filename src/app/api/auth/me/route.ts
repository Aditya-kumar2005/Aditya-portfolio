
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token');

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const decoded = verify(token.value, SECRET_KEY) as { userId: string; role: string; email: string };

    let user;
    if (decoded.role === 'ADMIN') {
      user = { id: 'admin', email: decoded.email, name: 'Admin', role: 'ADMIN' };
    } else {
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, name: true },
      });
    }

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.json({ ...user, role: decoded.role });
  } catch (error) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
