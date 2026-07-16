Check and Fix Routing, Custom Auth, Process Page \& Lint Errors

This implementation plan details the changes required to resolve ESLint errors, fix routing navigation inside Navbar \& Footer, add a custom database-backed basic authentication system using Prisma and Neon (completely replacing Clerk) with Role-Based Access Control (RBAC), build beautiful Login, Register, and Process pages, and add Back/Forward navigation controls.



User Review Required

IMPORTANT



Authentication \& Role-Based Access Control (RBAC): We will implement custom credentials authentication where users and admins are separated:



Admin User: The email nanuadityakumar@gmail.com will be recognized as the Admin. The admin password can be set in .env as ADMIN\_PASSWORD (with a fallback default password).

Regular Users: Users who sign up via /register will be stored in your Neon PostgreSQL database with a role of USER (using bcryptjs for hashing).

Access Restrictions:

Regular users (USER) can only access their client dashboard (/dashboard) and will NOT see admin data (inquiries, administrative statistics).

Admins (ADMIN) can access the administrative portal (/admin) and manage inquiries.

Middleware will protect routes /admin, /dashboard, and relevant /api routes based on JWT payload roles.

Pages to Add:



/login: Stunning glassmorphic user-friendly login interface.

/register: Stunning glassmorphic user-friendly sign-up interface.

/process: Dedicated walkthrough page detailing Aditya Lab's 5-step engineering process.

Proposed Changes

1\. Navigation \& Routing (Navbar \& Footer)

We will modify the Navbar and Footer to link directly to the correct pages (/services, /about, /portfolio, /testimonials, /pricing, /contact, /process) rather than using local smooth scrolling buttons that break on subpages. We will also add Back \& Forward history buttons to the navbar for easier user navigation when off the home page.



\[MODIFY] 

Navbar.tsx

Convert button-based links to Next.js <Link> elements.

Add dynamic styling based on the active path using usePathname().

Add Back and Forward buttons beside the brand logo if pathname !== '/' to support quick page history traversal.

Integrate custom client-side Auth hook to show a "Dashboard" (or "Admin Portal" if admin) link and a "Sign Out" button when signed in; show a "Sign In" button when signed out.

\[MODIFY] 

Footer.tsx

Convert local scroll button handlers to proper links or hybrid links (/pricing, /services, /process, etc.).

\[MODIFY] 

Testimonials.tsx

Add id="testimonials" to the main section element.

2\. Custom Authentication \& Authorization System

We will implement secure cookie-based JWT authentication and authorization without external providers, integrating with Prisma and Neon DB.



\[NEW] 

jwt.ts

Create Web Crypto API helpers to sign and verify JWT tokens inside edge runtimes (e.g. Next.js middleware) using HMAC SHA-256 and base64url encoding.

\[NEW] 

api/auth/register/route.ts

Handle sign-up: validate credentials, check email uniqueness, hash password with bcryptjs, store the user in Neon DB using Prisma with default role USER, and return a success response. Prevent registering with the admin email.

\[NEW] 

api/auth/login/route.ts

Handle sign-in:

If the email is the admin email nanuadityakumar@gmail.com, verify the password against ADMIN\_PASSWORD (from .env or hardcoded fallback). If correct, generate a JWT with role ADMIN.

For other emails, verify the user credentials from the database. If correct, generate a JWT with role USER.

Set the JWT in a secure, HTTP-only session-token cookie.

\[NEW] 

api/auth/logout/route.ts

Clear the secure session-token cookie to sign out the user.

\[NEW] 

api/auth/me/route.ts

Read and verify the session-token cookie, returning user profile details (id, name, email, role) for client-side state rehydration.

\[NEW] 

auth-context.tsx

Establish an AuthContext and <AuthProvider> to wrap the application, maintaining the user profile and offering signIn/signUp/signOut methods.

\[NEW] 

auth.ts

Export custom useAuth() and useUser() hooks connecting to AuthContext to act as drop-in Clerk replacements for the dashboards, maintaining code compatibility.

\[MODIFY] 

Providers.tsx

Wrap application layout in <AuthProvider> to provide global auth states.

\[MODIFY] 

middleware.ts

Rewrite middleware to enforce JWT-based authorization:

Private routes (/dashboard, /admin) require a valid session cookie.

/admin and /api/inquiries (GET/PATCH), /api/stats require role ADMIN. If a regular user (USER) attempts to access them, they are redirected to /dashboard or blocked.

/dashboard requires role USER or ADMIN.

3\. Login, Register, and Process Pages

\[NEW] 

login/page.tsx

Sleek glassmorphic sign-in page with validations, custom error state handling, loading animations, and transitions.

\[NEW] 

register/page.tsx

Sleek glassmorphic sign-up page for client onboarding, integrated with validation.

\[NEW] 

process/page.tsx

Rich, premium process page detailing the 5 core engineering phases of Aditya Lab (Discover, Validate, Design, Build, Launch \& Scale). Includes dynamic interactive step panels and progress indicators.

\[NEW] 

dashboard/page.tsx

Load and render UnifiedDashboard.

\[NEW] 

admin/page.tsx

Load and render AdminDashboard (if authorized).

4\. Check and Fix Lint Errors

We will resolve all 5 ESLint errors (react-hooks/set-state-in-effect) by avoiding synchronous setState calls during the render/effect timeline.



\[MODIFY] 

AdminDashboard.tsx

Defer fetchData in useEffect via setTimeout(..., 0) to allow rendering to complete before loading state changes.

\[MODIFY] 

UnifiedDashboard.tsx

Defer fetchData in useEffect via setTimeout(..., 0) to prevent cascading renders.

\[MODIFY] 

AIDemo.tsx

Eliminate the message synchronizing useEffect entirely; reset demo messages inside the tab buttons' onClick event handlers instead.

\[MODIFY] 

carousel.tsx

Defer the initial onSelect update inside useEffect with Promise.resolve().then(...).

\[MODIFY] 

use-mobile.ts

Defer initial client width setting inside the mounting effect using Promise.resolve().then(...).

Verification Plan

Automated Tests

Run npm run lint to verify that all ESLint errors are resolved.

Run npm run build to confirm compilation is successful.

Manual Verification

Test all navigation links from Navbar and Footer on home and subpages.

Verify that the Back/Forward navigation controls appear on subpages and work correctly.

Try accessing /dashboard without being logged in to confirm redirect to /login.

Register a test account, sign in, verify dashboard displays user info, and sign out.

Access /admin as regular user, confirm redirect to /dashboard.

Log in as admin nanuadityakumar@gmail.com, verify access to /admin dashboard.

