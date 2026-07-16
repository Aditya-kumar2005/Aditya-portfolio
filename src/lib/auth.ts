'use client';

import { useAuthContext } from './auth-context';

export function useAuth() {
  const { signOut, user, loading } = useAuthContext();
  return {
    signOut,
    userId: user?.id || null,
    isLoaded: !loading,
    isSignedIn: !!user,
  };
}

export function useUser() {
  const { user, loading } = useAuthContext();

  const adaptedUser = user
    ? {
        id: user.id,
        firstName: user.name?.split(' ')[0] || 'there',
        fullName: user.name || 'there',
        primaryEmailAddress: user.email, // UnifiedDashboard has `{user?.primaryEmailAddress || ''}`
        role: user.role,
      }
    : null;

  return {
    user: adaptedUser,
    isLoaded: !loading,
    isSignedIn: !!user,
  };
}
