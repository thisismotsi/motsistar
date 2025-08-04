"use client";

// components/ConceptTopics.tsx
interface ConceptTopicsProps {
  concepts: Record<string, any>;
}

export const ConceptTopics: React.FC<ConceptTopicsProps> = ({ concepts }) => {
  return (
    <div className="space-y-4">
      {Object.entries(concepts).map(([subject, detail]) => (
        <div key={subject}>
          <h2 className="text-lg font-semibold mb-2">{subject}</h2>
          {Object.entries(detail.level).map(([level, topics]: any) => (
            <div key={level} className="mb-2">
              <h3 className="font-medium text-blue-600">{level}</h3>
              <ul className="ml-4 list-disc">
                {topics.map((topic: any, i: number) => (
                  <li key={i}>
                    <a
                      href={topic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-800 hover:underline"
                    >
                      {topic.topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
