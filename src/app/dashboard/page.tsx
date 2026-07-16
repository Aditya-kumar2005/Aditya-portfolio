'use client';

import React from 'react';
import UnifiedDashboard from '@/components/dashboards/UnifiedDashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <UnifiedDashboard onBack={handleBack} />;
}
