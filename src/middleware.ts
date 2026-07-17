import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT, updateSession } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and internal Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // Allow search engine crawlers to bypass auth
  const ua = request.headers.get('user-agent') || '';
  if (
    ua.includes('Googlebot') ||
    ua.includes('Bingbot') ||
    ua.includes('Twitterbot') ||
    ua.includes('facebookexternalhit')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('session-token')?.value;
  let payload = null;

  if (token) {
    payload = await verifyJWT(token);
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute =
    pathname.startsWith('/api/stats') ||
    (pathname.startsWith('/api/inquiries') && request.method !== 'POST');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // If no token and trying to access a protected route
  if (!payload && (isAdminRoute || isAdminApiRoute || isDashboardRoute)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  let response = NextResponse.next();

  if (payload) {
    // Extend session validity
    response = updateSession(request, response, payload);

    // Admin role authorization check
    if ((isAdminRoute || isAdminApiRoute) && payload.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Dashboard access check
    if (isDashboardRoute && payload.role !== 'USER' && payload.role !== 'ADMIN') {
      const logoutRedirect = NextResponse.redirect(new URL('/login', request.url));
      logoutRedirect.cookies.delete('session-token');
      return logoutRedirect;
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Run middleware for everything except sitemap, robots, favicon, and static/image assets
    '/((?!sitemap.xml|robots.txt|_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
