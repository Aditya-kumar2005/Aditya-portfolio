Project Upgrades \& Security Audit Task List

1\. Core Upgrades \& Fixes

&#x20;Fix existing 5 React state-in-effect lint errors

&#x20;Implement Custom JWT Authentication \& RBAC (Prisma + Neon)

&#x20;Implement native Web Crypto API JWT helpers (src/lib/jwt.ts)

&#x20;Implement custom context and state management (src/lib/auth-context.tsx)

&#x20;Create drop-in compatibility hook adapter (src/lib/auth.ts)

&#x20;Set up Providers to use Custom Auth (src/components/Providers.tsx)

&#x20;Implement Auth API endpoints (/api/auth/register, /api/auth/login, /api/auth/logout, /api/auth/me)

&#x20;Update middleware.ts to protect routes using cookies

&#x20;Build Authentication and Admin Pages

&#x20;Create sleek, user-friendly login page (/login)

&#x20;Create client sign-up page (/register)

&#x20;Connect custom user dashboard (/dashboard)

&#x20;Connect custom admin dashboard (/admin)

&#x20;UI, Routing \& Navigation Improvements

&#x20;Update Navbar links to handle multi-page layout via standard <Link> components

&#x20;Add Back \& Forward buttons to the Navbar on subpages

&#x20;Update Footer links to support correct routing

&#x20;Add id="testimonials" to the Testimonials section

&#x20;Create dedicated /process page showcasing Aditya Lab's workflow

&#x20;SEO, Search \& Performance Optimization

&#x20;Update sitemap configuration (src/app/sitemap.ts)

&#x20;Add or update public/robots.txt

&#x20;Ensure fast rendering / Next.js static optimizations where possible

2\. Security Audit (17 Categories)

&#x20;Category 1: SECRETS\_EXPOSURE

&#x20;Audit \& write security/reports/SECRETS\_EXPOSURE\_REPORT.md

&#x20;Design \& write security/plans/SECRETS\_EXPOSURE\_PLAN.md

&#x20;Implement secrets shielding fixes

&#x20;Category 2: DATABASE\_ACCESS

&#x20;Audit \& write security/reports/DATABASE\_ACCESS\_REPORT.md

&#x20;Design \& write security/plans/DATABASE\_ACCESS\_PLAN.md

&#x20;Implement database access control fixes

&#x20;Category 3: AUTH\_MIDDLEWARE

&#x20;Audit \& write security/reports/AUTH\_MIDDLEWARE\_REPORT.md

&#x20;Design \& write security/plans/AUTH\_MIDDLEWARE\_PLAN.md

&#x20;Implement middleware auth protections

&#x20;Category 4: ACCESS\_CONTROL

&#x20;Audit \& write security/reports/ACCESS\_CONTROL\_REPORT.md

&#x20;Design \& write security/plans/ACCESS\_CONTROL\_PLAN.md

&#x20;Implement row-level owner checks

&#x20;Category 5: FRONTEND\_SECRETS

&#x20;Audit \& write security/reports/FRONTEND\_SECRETS\_REPORT.md

&#x20;Design \& write security/plans/FRONTEND\_SECRETS\_PLAN.md

&#x20;Implement client-side secret cleanup

&#x20;Category 6: SSRF

&#x20;Audit \& write security/reports/SSRF\_REPORT.md

&#x20;Design \& write security/plans/SSRF\_PLAN.md

&#x20;Implement URL safety validation

&#x20;Category 7: CSRF

&#x20;Audit \& write security/reports/CSRF\_REPORT.md

&#x20;Design \& write security/plans/CSRF\_PLAN.md

&#x20;Implement CSRF cookie options

&#x20;Category 8: SECURITY\_HEADERS

&#x20;Audit \& write security/reports/SECURITY\_HEADERS\_REPORT.md

&#x20;Design \& write security/plans/SECURITY\_HEADERS\_PLAN.md

&#x20;Add HTTP security headers middleware

&#x20;Category 9: CORS

&#x20;Audit \& write security/reports/CORS\_REPORT.md

&#x20;Design \& write security/plans/CORS\_PLAN.md

&#x20;Implement CORS protections

&#x20;Category 10: RATE\_LIMITING

&#x20;Audit \& write security/reports/RATE\_LIMITING\_REPORT.md

&#x20;Design \& write security/plans/RATE\_LIMITING\_PLAN.md

&#x20;Add rate limiter middleware on sensitive endpoints

&#x20;Category 11: SQL\_INJECTION

&#x20;Audit \& write security/reports/SQL\_INJECTION\_REPORT.md

&#x20;Design \& write security/plans/SQL\_INJECTION\_PLAN.md

&#x20;Verify ORM input safety

&#x20;Category 12: XSS

&#x20;Audit \& write security/reports/XSS\_REPORT.md

&#x20;Design \& write security/plans/XSS\_PLAN.md

&#x20;Verify element rendering auto-escaping and HTML parsing

&#x20;Category 13: PAYMENT\_WEBHOOKS

&#x20;Audit \& write security/reports/PAYMENT\_WEBHOOKS\_REPORT.md

&#x20;Design \& write security/plans/PAYMENT\_WEBHOOKS\_PLAN.md

&#x20;Verify signature validation if webhook endpoints exist

&#x20;Category 14: FILE\_UPLOADS

&#x20;Audit \& write security/reports/FILE\_UPLOADS\_REPORT.md

&#x20;Design \& write security/plans/FILE\_UPLOADS\_PLAN.md

&#x20;Implement magic-byte type checking and renaming

&#x20;Category 15: ERROR\_HANDLING

&#x20;Audit \& write security/reports/ERROR\_HANDLING\_REPORT.md

&#x20;Design \& write security/plans/ERROR\_HANDLING\_PLAN.md

&#x20;Secure global API error handlers

&#x20;Category 16: PASSWORD\_HASHING

&#x20;Audit \& write security/reports/PASSWORD\_HASHING\_REPORT.md

&#x20;Design \& write security/plans/PASSWORD\_HASHING\_PLAN.md

&#x20;Verify bcrypt integration

&#x20;Category 17: DEPENDENCIES

&#x20;Audit \& write security/reports/DEPENDENCIES\_REPORT.md

&#x20;Design \& write security/plans/DEPENDENCIES\_PLAN.md

&#x20;Lock package dependencies

&#x20;Create security/AUDIT\_SUMMARY.md

