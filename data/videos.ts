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
      Math: [],
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
  "grade-10": {
    subjects: {
      Math: [
        { id: "W2MkNqreCAI", title: "Introduction to Linear Graphs" },
        { id: "E8_5gmiV5u0", title: "Effect of Gradient on a Linear Graph" },
        {
          id: "CMkmuf-UUeM",
          title: "Effect of y-intercept on the Linear Graph",
        },
        {
          id: "wD7b7dy8MRU",
          title: "Calculating gradient of linear graphs given two points",
        },
      ],
      Physics: [],
      Chemistry: [],
      Biology: [],
      "Tips & Tricks": [],
    },
  },
};
