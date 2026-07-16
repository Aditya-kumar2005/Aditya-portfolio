import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('session-token');

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const payload = await verifyJWT(token.value);
    if (!payload) {
      return new NextResponse('Invalid token', { status: 401 });
    }

    // You can fetch user details from your database here if needed
    // For now, we'll return the payload from the token
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error verifying token:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
