// components/dashboard/UpcomingTests.tsx
import { FC } from 'react';
import Link from 'next/link';

interface Test {
  testName: string;
  date: string;
}

interface UpcomingTestsProps {
  tests: Test[];
}

const UpcomingTests: FC<UpcomingTestsProps> = ({ tests }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Upcoming Tests</h3>
      <ul>
        {tests.map((test, index) => (
          <li key={index} className="border-b py-3">
            <Link href={`/tests/jee-mains/${test.testName}`} className="text-primary hover:underline">
              <p className="font-medium">{test.testName}</p>
              <p className="text-sm text-gray-500">{test.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTests;
