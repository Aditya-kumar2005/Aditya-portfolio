'use client';

import React, { type ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Inline dark theme definition (equivalent to @clerk/themes dark)
// This avoids the @clerk/themes dependency which has CJS resolution issues
const darkTheme = {
  layout: {
    socialButtonsVariant: 'iconButton' as const,
    logoImageUrl: undefined,
  },
  elements: {
    formButtonPrimary: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white',
    card: 'bg-[#0B1120] border-white/10',
    socialButtonsBlockButton: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
    formFieldInput: 'bg-[#0B1120] border-white/10 text-white',
    dividerLine: 'bg-white/10',
    dividerText: 'text-white/40',
    formHeaderTitle: 'text-white',
    formHeaderSubtitle: 'text-white/60',
    footerActionLink: 'text-[#7C3AED] hover:text-[#8B5CF6]',
    identityPreviewText: 'text-white',
  },
};

export default function Providers({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    // No Clerk key configured — render children without ClerkProvider
    // The mock auth system in auth.tsx will be used instead
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: darkTheme,
        variables: {
          colorPrimary: '#7C3AED',
          colorBackground: '#0B1120',
          colorInputBackground: '#0B1120',
          colorInputText: '#FFFFFF',
          colorNeutral: '#1E293B',
          colorDanger: '#EF4444',
          colorSuccess: '#22C55E',
          colorWarning: '#F59E0B',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
