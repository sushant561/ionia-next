// components/practice/ChapterList.tsx
import { FC } from 'react';
import Link from 'next/link';

interface ChapterListProps {
  chapters: { id: string; name: string }[];
  subjectId: string;
}

const ChapterList: FC<ChapterListProps> = ({ chapters, subjectId }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Chapters</h3>
      {chapters.map((chapter) => (
        <Link key={chapter.id} href={`/practice/${subjectId}/${chapter.id}`} className="block bg-gray-100 hover:bg-gray-200 rounded-lg p-4">
          <p className="text-lg">{chapter.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ChapterList;
