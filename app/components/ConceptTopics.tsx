"use client";

// components/ConceptTopics.tsx
interface TopicItem {
  topic: string;
  url: string;
}

interface ConceptLevel {
  [level: string]: TopicItem[];
}

interface ConceptDetail {
  level: ConceptLevel;
}

interface ConceptsMap {
  [subject: string]: ConceptDetail;
}

interface ConceptTopicsProps {
  concepts: ConceptsMap;
}

export const ConceptTopics: React.FC<ConceptTopicsProps> = ({ concepts }) => {
  return (
    <div>
      {Object.entries(concepts).map(([subject, detail]) => (
        <div key={subject}>
          <h2 className="text-lg font-semibold mb-2">{subject}</h2>
          {Object.entries(detail.level).map(([level, topics]) => (
            <div key={level} className="mb-2">
              <h3 className="font-medium text-blue-600">{level}</h3>
              <ul className="ml-4 list-disc">
                {topics.map((topic, i) => (
                  <li key={i}>
                    <a
                      href={topic.url}
                      className="text-blue-500 hover:underline"
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
