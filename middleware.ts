import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/inquiries',
  '/api/chat',
  '/api/stats',
  '/api/inquiries/(.*)',
  '/sitemap.xml', // ✅ Changed from .ts to .xml
  '/robots.txt'   // ✅ Added robots.txt while we are at it
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    // ✅ Added sitemap.xml and robots.txt explicitly to the skip regex
    '/((?!_next|sitemap\\.xml|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
