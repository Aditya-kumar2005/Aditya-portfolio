
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/jwt';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - login (login page)
     * - register (register page)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|login|register).)*',
  ],
};
