// components/practice/TopicCard.tsx
import { FC } from 'react';
import Link from 'next/link';

interface TopicCardProps {
  topicId: string;
  topicName: string;
}

const TopicCard: FC<TopicCardProps> = ({ topicId, topicName }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <Link href={`/practice/topic/${topicId}`}>
        <h4 className="text-lg font-semibold">{topicName}</h4>
      </Link>
    </div>
  );
};

export default TopicCard;
