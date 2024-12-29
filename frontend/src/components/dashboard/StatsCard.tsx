import { Card } from '@/components/ui/card';
import {
  Clipboard,
  ChartBar,
  Calendar,
  Target,
} from 'lucide-react';

const icons = {
  clipboard: Clipboard,
  chart: ChartBar,
  calendar: Calendar,
  target: Target,
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof icons;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  const Icon = icons[icon];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="rounded-full bg-blue-100 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </Card>
  );
}