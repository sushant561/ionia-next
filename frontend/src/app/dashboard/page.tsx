// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import RecentTests from '@/components/dashboard/RecentTests';
import UpcomingTests from '@/components/dashboard/UpcomingTests';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    testsThisWeek: 0,
    accuracy: 0,
  });

  useEffect(() => {
    // Fetch dashboard data
    // This would be replaced with actual API calls
    setStats({
      totalTests: 24,
      averageScore: 76.5,
      testsThisWeek: 3,
      accuracy: 82,
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Tests"
          value={stats.totalTests}
          icon="clipboard"
        />
        <StatsCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon="chart"
        />
        <StatsCard
          title="Tests This Week"
          value={stats.testsThisWeek}
          icon="calendar"
        />
        <StatsCard
          title="Accuracy"
          value={`${stats.accuracy}%`}
          icon="target"
        />
      </div>

      {/* Performance Chart */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
        <PerformanceChart />
      </Card>

      {/* Recent and Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTests />
        <UpcomingTests />
      </div>
    </div>
  );
}