import { FC } from 'react';
import Link from 'next/link';

interface Test {
  testName: string;
  date: string;
  score: number;
}

interface RecentTestsProps {
  tests: Test[];
}

const RecentTests: FC<RecentTestsProps> = ({ tests = [] }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Tests</h3>
      <ul>
        {tests.length > 0 ? (
          tests.map((test, index) => (
            <li key={index} className="border-b py-3">
              <Link href={`/tests/jee-mains/${test.testName}`} className="text-primary hover:underline">
                <p className="font-medium">{test.testName}</p>
                <p className="text-sm text-gray-500">{test.date}</p>
                <p className="text-sm text-green-600">Score: {test.score}</p>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No recent tests available.</p>
        )}
      </ul>
    </div>
  );
};

export default RecentTests;
