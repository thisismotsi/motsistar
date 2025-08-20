// lessonsData.ts

export type Lesson = {
  id: string;
  title: string;
};

export type LessonsData = {
  [grade: string]: {
    subjects: {
      [subject: string]: {
        id: string;
        title: string;
      }[];
    };
  };
};

export const lessons: LessonsData = {
  "grade-12": {
    subjects: {
      Math: [
        { id: "WsQQvHm4lSw", title: "Learn Algebra in 10 Minutes" },
        { id: "AVWrB1vt5nM", title: "Calculus Basics" },
      ],
      Physics: [
        { id: "ZAqIoDhornk", title: "Basic Physics Concepts" },
        { id: "YWGZ12ohMJU", title: "Newton’s Laws of Motion" },
      ],
      Chemistry: [
        { id: "OmJ-4B-mS-Y", title: "Introduction to Chemistry" },
        { id: "OZU7HMV4fNA", title: "Organic Chemistry Overview" },
      ],
      Biology: [
        { id: "V6yixyiJcos", title: "Biology: Cells & Organisms" },
        { id: "DCh3N2ulmJY", title: "Genetics Simplified" },
      ],
      "Tips & Tricks": [
        { id: "PXwStduNw14", title: "Study Tips and Tricks" },
        { id: "CxGSnA-RTsA", title: "Exam Preparation Tips" },
      ],
    },
  },
  "grade-11": {
    subjects: {
      Biology: [
        { id: "V6yixyiJcos", title: "Biology: Cells & Organisms" },
        { id: "DCh3N2ulmJY", title: "Genetics Simplified" },
      ],
    },
  },
};
