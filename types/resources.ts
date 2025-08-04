export type ResourceFile = {
  code: string;
  type: string;
  format: string;
  url: string;
};

export type Subject = {
  code: string;
  name: string;
  syllabuses?: ResourceFile[];
  specimens?: ResourceFile[]; // ✅ FIXED: Flattened to match your JSON
  pastPapers?: {
    year: number;
    papers?: ResourceFile[];
  }[];
  examinerReports?: ResourceFile[];
};

export type Level = {
  code: string;
  name: string;
  subjects: Record<string, Subject>;
};

export type Council = {
  code: string;
  name: string;
  levels: Record<string, Level>;
};

export type ResourcesData = {
  councils: Record<string, Council>;
};
