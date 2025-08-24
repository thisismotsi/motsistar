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
        { id: "eZaAQ2hZaUA", title: "Magnitude and Direction of Vectors" },
      ],
      Physics: [],
      Chemistry: [],
      Biology: [],
      "Tips & Tricks": [],
    },
  },
  "grade-11": {
    subjects: {
      Biology: [],
    },
  },
};
