// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ArrowRight, ArrowLeft, LogOut, ShieldAlert, LayoutDashboard } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import BrandLogo from '@/components/BrandLogo';
// import { useUser, useAuth } from '@/lib/auth';

// const navLinks = [
//   { label: 'Services', href: '/services' },
//   { label: 'Process', href: '/process' },
//   { label: 'About', href: '/about' },
//   { label: 'Portfolio', href: '/portfolio' },
//   { label: 'Testimonials', href: '/testimonials' },
//   { label: 'Pricing', href: '/pricing' },
// ];

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, isSignedIn, isLoaded } = useUser();
//   const { signOut } = useAuth();

//   const handleSignOut = async () => {
//     await signOut();
//     setMobileOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 w-full">
//       {/* Glass background */}
//       <div className="absolute inset-0 bg-dark/70 backdrop-blur-xl border-b border-white/5" />

//       <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Left: Brand & Back/Forward buttons */}
//         <div className="flex items-center gap-3">
//           <Link href="/">
//             <BrandLogo size="sm" showSubtitle={false} />
//           </Link>
          
//           {/* Back & Forward toolbar on subpages */}
//           {pathname !== '/' && (
//             <div className="hidden items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10 sm:flex">
//               <button
//                 onClick={() => router.back()}
//                 className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
//                 title="Go Back"
//                 type="button"
//               >
//                 <ArrowLeft className="size-3.5" />
//               </button>
//               <button
//                 onClick={() => router.forward()}
//                 className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
//                 title="Go Forward"
//                 type="button"
//               >
//                 <ArrowRight className="size-3.5" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Center: Desktop nav links */}
//         <div className="hidden items-center gap-1 md:flex">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
//                   isActive
//                     ? 'text-brand bg-brand/10 ring-1 ring-brand/15'
//                     : 'text-white/60 hover:text-white hover:bg-white/4'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right: Desktop actions */}
//         <div className="hidden items-center gap-4 md:flex">
//           {isLoaded && (
//             <>
//               {isSignedIn ? (
//                 <div className="flex items-center gap-3">
//                   <Link
//                     href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
//                     className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/8 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
//                   >
//                     {user?.role === 'ADMIN' ? (
//                       <>
//                         <ShieldAlert className="size-3.5 text-brand" />
//                         Admin Portal
//                       </>
//                     ) : (
//                       <>
//                         <LayoutDashboard className="size-3.5 text-brand" />
//                         Dashboard
//                       </>
//                     )}
//                   </Link>
//                   <button
//                     onClick={handleSignOut}
//                     className="flex size-9 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 ring-1 ring-red-500/25 transition-all"
//                     title="Sign Out"
//                     type="button"
//                   >
//                     <LogOut className="size-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-4">
//                   <Link
//                     href="/login"
//                     className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//                     <Link
//                       href="/contact"
//                       className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-secondary transition-all"
//                     >
//                       Let&apos;s Talk
//                       <ArrowRight className="size-3.5" />
//                     </Link>
//                   </motion.div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Mobile: Hamburger & Navigation Control indicators */}
//         <div className="flex items-center gap-2 md:hidden">
//           {pathname !== '/' && (
//             <div className="flex items-center gap-1 rounded-lg bg-white/5 p-0.5 ring-1 ring-white/10">
//               <button
//                 onClick={() => router.back()}
//                 className="rounded-md p-1 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
//                 title="Go Back"
//                 type="button"
//               >
//                 <ArrowLeft className="size-3" />
//               </button>
//             </div>
//           )}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
//             aria-label="Toggle menu"
//             type="button"
//           >
//             {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile: Full overlay */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             className="fixed inset-0 top-16 z-40 md:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Backdrop */}
//             <div
//               className="absolute inset-0 bg-dark/80 backdrop-blur-lg"
//               onClick={() => setMobileOpen(false)}
//             />

//             {/* Menu panel */}
//             <motion.div
//               className="relative mx-4 mt-4 rounded-2xl border border-white/8 bg-surface/95 p-6 backdrop-blur-xl shadow-2xl shadow-black/50"
//               initial={{ opacity: 0, y: -12, scale: 0.96 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -12, scale: 0.96 }}
//               transition={{ type: 'spring', damping: 28, stiffness: 350 }}
//             >
//               <div className="flex flex-col gap-1">
//                 {navLinks.map((link, i) => {
//                   const isActive = pathname === link.href;
//                   return (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setMobileOpen(false)}
//                       className={`block rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
//                         isActive
//                           ? 'text-brand bg-brand/10'
//                           : 'text-white/70 hover:bg-white/4 hover:text-white'
//                       }`}
//                     >
//                       <motion.span
//                         initial={{ opacity: 0, x: -16 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.04 }}
//                       >
//                         {link.label}
//                       </motion.span>
//                     </Link>
//                   );
//                 })}
//               </div>

//               <div className="my-4 h-px bg-white/6" />

//               <div className="flex flex-col gap-3">
//                 {isLoaded && (
//                   <>
//                     {isSignedIn ? (
//                       <div className="space-y-3">
//                         <Link
//                           href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
//                           onClick={() => setMobileOpen(false)}
//                           className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/8 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
//                         >
//                           {user?.role === 'ADMIN' ? (
//                             <>
//                               <ShieldAlert className="size-4 text-brand" />
//                               Admin Portal
//                             </>
//                           ) : (
//                             <>
//                               <LayoutDashboard className="size-4 text-brand" />
//                               Dashboard
//                             </>
//                           )}
//                         </Link>
//                         <button
//                           onClick={handleSignOut}
//                           className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20"
//                           type="button"
//                         >
//                           <LogOut className="size-4" />
//                           Sign Out
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col gap-3">
//                         <Link
//                           href="/login"
//                           onClick={() => setMobileOpen(false)}
//                           className="flex w-full items-center justify-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition-all"
//                         >
//                           Sign In
//                         </Link>
//                         <Link
//                           href="/contact"
//                           onClick={() => setMobileOpen(false)}
//                           className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
//                         >
//                           Let&apos;s Talk
//                           <ArrowRight className="size-4" />
//                         </Link>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LogOut, ShieldAlert, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useUser, useAuth } from '@/lib/auth';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setMobileOpen(false);
  };

  const handleBookCall = () => {
    router.push('/contact');
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-xl z-50 bg-surface/40 backdrop-blur-xl border border-primary/20 shadow-[0_0_15px_rgba(60,220,209,0.1)] flex justify-between items-center px-8 py-3">
      <div className="flex items-center gap-3">
        <Link href="/">
          <BrandLogo size="sm" showSubtitle={false} />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-4 md:flex">
        {isLoaded && (
          <>
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/8 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  {user?.role === 'ADMIN' ? (
                    <>
                      <ShieldAlert className="size-3.5 text-brand" />
                      Admin Portal
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="size-3.5 text-brand" />
                      Dashboard
                    </>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex size-9 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 ring-1 ring-red-500/25 transition-all"
                  title="Sign Out"
                  type="button"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button onClick={handleBookCall} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(60,220,209,0.3)] transition-all duration-300 active:scale-95">
                Book Discovery Call
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Toggle menu"
          type="button"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-20 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-dark/80 backdrop-blur-lg"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="relative mx-4 mt-4 rounded-2xl border border-white/8 bg-surface/95 p-6 backdrop-blur-xl shadow-2xl shadow-black/50"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-brand bg-brand/10'
                        : 'text-white/70 hover:bg-white/4 hover:text-white'
                    }`}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
              </div>
              <div className="my-4 h-px bg-white/6" />
              <div className="flex flex-col gap-3">
                {isLoaded && (
                  <>
                    {isSignedIn ? (
                      <div className="space-y-3">
                        <Link
                          href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                          onClick={() => setMobileOpen(false)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/8 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                        >
                          {user?.role === 'ADMIN' ? (
                            <>
                              <ShieldAlert className="size-4 text-brand" />
                              Admin Portal
                            </>
                          ) : (
                            <>
                              <LayoutDashboard className="size-4 text-brand" />
                              Dashboard
                            </>
                          )}
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20"
                          type="button"
                        >
                          <LogOut className="size-4" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { handleBookCall(); setMobileOpen(false); }} className="w-full bg-primary text-on-primary px-6 py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(60,220,209,0.3)] transition-all duration-300 active:scale-95">
                        Book Discovery Call
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
