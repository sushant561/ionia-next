'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan 1', score: 65 },
  { date: 'Jan 5', score: 72 },
  { date: 'Jan 10', score: 68 },
  { date: 'Jan 15', score: 78 },
  { date: 'Jan 20', score: 82 },
  { date: 'Jan 25', score: 75 },
  { date: 'Jan 30', score: 85 },
];

export default function PerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* // components/dashboard/PerformanceChart.tsx
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface PerformanceChartProps {
  data: { labels: string[]; values: number[] };
}

const PerformanceChart: FC<PerformanceChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Test Performance',
        data: data.values,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Performance Over Time</h3>
      <Line data={chartData} />
    </div>
  );
};

export default PerformanceChart;
 */