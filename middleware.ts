import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Identify routes that require Admin privileges
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = 
    pathname.startsWith('/api/stats') || 
    (pathname.startsWith('/api/inquiries') && request.method !== 'POST'); // inquiries GET/PATCH/DELETE are admin only. POST is public.

  // 2. Identify routes that require regular User dashboard privileges
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // If the path doesn't require any auth checks, let it pass
  if (!isAdminRoute && !isAdminApiRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  // 3. Read the session cookie token
  const token = request.cookies.get('session-token')?.value;

  if (!token) {
    // If it's an API route, return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    // Redirect web requests to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Verify token validity
  const payload = await verifyJWT(token);
  if (!payload) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Session expired or invalid' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session-token');
    return response;
  }

  // 5. Admin role authorization check
  if (isAdminRoute || isAdminApiRoute) {
    if (payload.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
      // Redirect regular users to client dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 6. User role authorization check
  if (isDashboardRoute) {
    // Both USER and ADMIN can see the client dashboard (admins might want to view the client side)
    if (payload.role !== 'USER' && payload.role !== 'ADMIN') {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|sitemap\\.xml|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
