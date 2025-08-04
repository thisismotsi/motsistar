"use client";

import { use } from "react";
import resourcesRaw from "../../../data/resources.json";
import FolderLink from "../../components/FolderLink";

// Type Definitions
type ResourceFile = {
  code: string;
  type: string;
  format?: string;
  url: string;
  year?: string | number;
  yearRange?: string;
};

type PastPaperGroup = {
  year: string | number;
  papers?: ResourceFile[];
};

type SpecimenGroup = {
  series: string;
  papers?: ResourceFile[];
};

type Subject = {
  code: string;
  name: string;
  syllabuses?: ResourceFile[];
  specimens?: SpecimenGroup[] | ResourceFile[];
  pastPapers?: PastPaperGroup[];
  examinerReports?: ResourceFile[];
};

type Level = {
  code: string;
  name: string;
  subjects: Record<string, Subject>;
};

type Council = {
  code: string;
  name: string;
  levels: Record<string, Level>;
};

type ResourcesData = {
  councils: Record<string, Council>;
};

const resourcesData: ResourcesData = resourcesRaw;

const fileSections = [
  { key: "pastPapers", label: "Past Papers" },
  { key: "specimens", label: "Specimen Papers" },
  { key: "syllabuses", label: "Syllabus" },
  { key: "examinerReports", label: "Examiner Reports" },
] as const;

export default function DynamicResourcePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = use(params);

  const decodeSlug = slug.map((s) => decodeURIComponent(s));
  const [council, level, subject] = decodeSlug;

  const isRoot = !council;
  const isCouncilLevel = council && !level;
  const isLevelSubject = council && level && !subject;
  const isSubjectView = council && level && subject;

  const subjectData =
    isSubjectView &&
    resourcesData.councils[council as keyof ResourcesData["councils"]]?.levels[
      level as keyof Council["levels"]
    ]?.subjects[subject as keyof Level["subjects"]];

  return (
    <div className="pt-[80px] p-4 max-w-6xl mx-auto text-center relative z-0">
      {/* Subject Navigation */}
      {isSubjectView && subjectData && (
        <div className="sticky top-[210px] z-[300] bg-gray-50 py-3 px-4 mb-10 rounded shadow-md">
          <div className="flex justify-center gap-4 text-sm font-medium">
            {fileSections.map(({ key, label }) => {
              const section = subjectData[key as keyof Subject];
              return Array.isArray(section) && section.length > 0 ? (
                <button
                  key={key}
                  onClick={() => {
                    const el = document.getElementById(key);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-purple-700 hover:underline"
                  aria-label={`Jump to ${label}`}
                >
                  {label}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Root: Select Council */}
      {isRoot && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-10">
            Select a Council
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(resourcesData.councils).map(([key, council]) => (
              <FolderLink
                key={key}
                href={`/resources/${key}`}
                label={council.name}
              />
            ))}
          </div>
        </>
      )}

      {/* Council: Select Level */}
      {isCouncilLevel && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-10">
            Select Level for {council}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(
              resourcesData.councils[council as keyof ResourcesData["councils"]]
                .levels
            ).map(([levelKey, level]) => (
              <FolderLink
                key={levelKey}
                href={`/resources/${council}/${levelKey}`}
                label={level.name}
              />
            ))}
          </div>
        </>
      )}

      {/* Level: Select Subject */}
      {isLevelSubject && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-10">
            Select Subject for {level} Level
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(
              resourcesData.councils[council as keyof ResourcesData["councils"]]
                .levels[level as keyof Council["levels"]].subjects
            ).map(([subjectKey, subject]) => (
              <FolderLink
                key={subjectKey}
                href={`/resources/${council}/${level}/${encodeURIComponent(
                  subjectKey
                )}`}
                label={subject.name + " - " + subject.code}
              />
            ))}
          </div>
        </>
      )}

      {/* Subject View: Show Files */}
      {isSubjectView && subjectData && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-10 capitalize">
            {subjectData.name}
          </h1>

          {fileSections.map(({ key, label }) => {
            const files = subjectData[key as keyof Subject] as
              | ResourceFile[]
              | PastPaperGroup[]
              | SpecimenGroup[]
              | undefined;

            if (!files || files.length === 0) {
              return (
                <p key={key} className="italic text-gray-500 text-center mb-10">
                  No {label.toLowerCase()} available for this subject.
                </p>
              );
            }

            let sortedFiles = files;

            if (key === "pastPapers") {
              sortedFiles = [...(files as PastPaperGroup[])].sort(
                (a, b) => Number(b.year) - Number(a.year) // ensure both are numbers
              );
            } else if (key === "specimens") {
              const isFlat =
                Array.isArray(files) &&
                (files as ResourceFile[])[0]?.url !== undefined;
              if (isFlat) {
                sortedFiles = [
                  {
                    series: "",
                    papers: [...(files as ResourceFile[])].reverse(),
                  },
                ];
              } else {
                sortedFiles = [...(files as SpecimenGroup[])].reverse();
              }
            } else if (key === "syllabuses" || key === "examinerReports") {
              sortedFiles = [...(files as ResourceFile[])].reverse();
            }

            return (
              <div key={key} id={key} className="mb-10 scroll-mt-20">
                <h2 className="text-xl font-semibold text-purple-700 mb-10">
                  {label}
                </h2>

                {key === "pastPapers" || key === "specimens" ? (
                  (sortedFiles as PastPaperGroup[] | SpecimenGroup[]).map(
                    (entry, index) => (
                      <div
                        key={
                          (entry as PastPaperGroup).year ??
                          (entry as SpecimenGroup).series ??
                          index
                        }
                        className="mb-4 text-left"
                      >
                        {key === "pastPapers" && (
                          <h3 className="font-bold text-gray-700 mb-2">
                            Year: {(entry as PastPaperGroup).year}
                          </h3>
                        )}
                        {key === "specimens" &&
                          (entry as SpecimenGroup).series && (
                            <h3 className="font-bold text-gray-700 mb-2">
                              Series: {(entry as SpecimenGroup).series}
                            </h3>
                          )}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {Array.isArray(entry.papers) &&
                            entry.papers.map((paper) => (
                              <div
                                key={paper.code}
                                className="border border-purple-500 p-3 rounded bg-white shadow-sm"
                              >
                                <p className="text-sm font-medium text-gray-800">
                                  {paper.code} {"|"} {paper.type || paper.code}
                                </p>
                                <div className="flex gap-2 mt-2 justify-center">
                                  <a
                                    href={paper.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-sm"
                                    aria-label={`View ${paper.code}`}
                                  >
                                    View
                                  </a>
                                  <a
                                    href={paper.url}
                                    download
                                    className="text-green-600 underline text-sm"
                                    aria-label={`Download ${paper.code}`}
                                  >
                                    Download
                                  </a>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(sortedFiles as ResourceFile[]).map((file) => (
                      <div
                        key={file.code}
                        className="border border-purple-500 p-3 rounded bg-white shadow-sm"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {file.type || file.code}{" "}
                          {"year" in file ? file.year : file.yearRange}
                        </p>
                        <div className="flex gap-2 mt-2 justify-center">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                            aria-label={`View ${file.code}`}
                          >
                            View
                          </a>
                          <a
                            href={file.url}
                            download
                            className="text-green-600 underline text-sm"
                            aria-label={`Download ${file.code}`}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
