"use client";

import Link from "next/link";
import { FaFolder, FaDownload } from "react-icons/fa";

type FileItem = {
  topic?: string;
  url?: string;
};

type FolderViewProps = {
  title: string;
  folders?: string[];
  basePath?: string;
  filesByYear?: Record<string, FileItem[]>;
};

export default function FolderView({
  title,
  folders = [],
  basePath = "",
  filesByYear = {},
}: FolderViewProps) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folders.map((folder) => (
          <Link
            key={folder}
            href={`${basePath}/${folder}`}
            aria-label={`Open folder ${folder}`}
          >
            <div className="flex items-center p-4 bg-white shadow hover:bg-purple-50 transition rounded cursor-pointer">
              <FaFolder className="w-5 h-5 text-purple-600" size={20} />
              <span className="text-sm font-medium">{folder}</span>
            </div>
          </Link>
        ))}

        {/* Render Files */}
        {filesByYear &&
          Object.entries(filesByYear).map(([year, files]) => (
            <div key={year} className="bg-white p-4 shadow rounded">
              <div className="font-semibold mb-2 flex items-center gap-2">
                <FaFolder className="w-5 h-5 text-purple-600" /> {year}
              </div>
              {Array.isArray(files)
                ? files.map((file, index) => (
                    <div
                      key={file.url || file.topic || index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span>{file.topic || `Document ${index + 1}`}</span>
                      <a
                        href={file.url || "#"}
                        className="text-purple-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${
                          file.topic || `Document ${index + 1}`
                        }`}
                      >
                        <FaDownload className="inline mr-1" /> Download
                      </a>
                    </div>
                  ))
                : null}
            </div>
          ))}
      </div>
    </div>
  );
}
