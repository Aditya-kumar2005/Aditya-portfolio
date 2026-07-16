'use client';

import React from 'react';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <AdminDashboard onBack={handleBack} />;
}
