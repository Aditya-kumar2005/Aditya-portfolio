import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT, updateSession } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets and internal Next.js routes from auth checks
  if (pathname.startsWith('/_next') || pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webmanifest)$/)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('session-token')?.value;
  let payload = null;

  if (token) {
    payload = await verifyJWT(token);
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/stats') || (pathname.startsWith('/api/inquiries') && request.method !== 'POST');
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
    // If the user is authenticated, update the session to extend its validity
    response = updateSession(request, response, payload);

    // Admin role authorization check
    if ((isAdminRoute || isAdminApiRoute) && payload.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
      // Redirect non-admins from admin pages to their own dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // General dashboard access check (both USER and ADMIN can access)
    if (isDashboardRoute && payload.role !== 'USER' && payload.role !== 'ADMIN') {
      const logoutRedirect = NextResponse.redirect(new URL('/login', request.url));
      logoutRedirect.cookies.delete('session-token');
      return logoutRedirect;
    }
  }

  return response;
}

export const config = {
  // Match all paths except for specific static files and meta routes.
  matcher: [
    '/((?!sitemap.xml|robots.txt|_next/static|_next/image|favicon.ico).*)(/)?',
    '/(api|trpc)(.*)'
  ],
};
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyJWT } from '@/lib/jwt';

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Identify routes that require Admin privileges
//   const isAdminRoute = pathname.startsWith('/admin');
//   const isAdminApiRoute = 
//     pathname.startsWith('/api/stats') || 
//     (pathname.startsWith('/api/inquiries') && request.method !== 'POST'); // inquiries GET/PATCH/DELETE are admin only. POST is public.

//   // 2. Identify routes that require regular User dashboard privileges
//   const isDashboardRoute = pathname.startsWith('/dashboard');

//   // If the path doesn't require any auth checks, let it pass
//   if (!isAdminRoute && !isAdminApiRoute && !isDashboardRoute) {
//     return NextResponse.next();
//   }

//   // 3. Read the session cookie token
//   const token = request.cookies.get('session-token')?.value;

//   if (!token) {
//     // If it's an API route, return 401
//     if (pathname.startsWith('/api/')) {
//       return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//     }
//     // Redirect web requests to login
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // 4. Verify token validity
//   const payload = await verifyJWT(token);
//   if (!payload) {
//     if (pathname.startsWith('/api/')) {
//       return NextResponse.json({ error: 'Session expired or invalid' }, { status: 401 });
//     }
//     const response = NextResponse.redirect(new URL('/login', request.url));
//     response.cookies.delete('session-token');
//     return response;
//   }

//   // 5. Admin role authorization check
//   if (isAdminRoute || isAdminApiRoute) {
//     if (payload.role !== 'ADMIN') {
//       if (pathname.startsWith('/api/')) {
//         return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
//       }
//       // Redirect regular users to client dashboard
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//   }

//   // 6. User role authorization check
//   if (isDashboardRoute) {
//     // Both USER and ADMIN can see the client dashboard (admins might want to view the client side)
//     if (payload.role !== 'USER' && payload.role !== 'ADMIN') {
//       const response = NextResponse.redirect(new URL('/login', request.url));
//       response.cookies.delete('session-token');
//       return response;
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files
//     '/((?!_next|sitemap\\.xml|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };