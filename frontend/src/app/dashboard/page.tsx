'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import RecentTests from '@/components/dashboard/RecentTests';
import UpcomingTests from '@/components/dashboard/UpcomingTests';
import { Card } from '@/components/dashboard/card';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { token, setToken } = useAuth();
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    testsThisWeek: 0,
    accuracy: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch dashboard statistics (simulate API call)
    const fetchStats = async () => {
      try {
        // Replace this mock data with a real API call
        const data = {
          totalTests: 24,
          averageScore: 76.5,
          testsThisWeek: 3,
          accuracy: 82,
        };
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    setToken(null); // Update context state
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Tests" value={stats.totalTests} icon="clipboard" />
        <StatsCard title="Average Score" value={`${stats.averageScore}%`} icon="chart" />
        <StatsCard title="Tests This Week" value={stats.testsThisWeek} icon="calendar" />
        <StatsCard title="Accuracy" value={`${stats.accuracy}%`} icon="target" />
      </section>

      {/* Performance Chart Section */}
      <section className="mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
          <PerformanceChart />
        </Card>
      </section>

      {/* Recent and Upcoming Tests Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTests />
        <UpcomingTests />
      </section>
    </div>
  );
}
