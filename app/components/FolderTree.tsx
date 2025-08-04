"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";

interface File {
  name: string;
  url: string;
}

interface Folder {
  name: string;
  files?: File[];
  folders?: Folder[];
}

interface FolderTreeProps {
  data?: Folder[];
}

export const FolderTree: React.FC<FolderTreeProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-gray-500 text-sm">No resources found.</div>;
  }

  return (
    <div className="text-sm">
      {data.map((folder) => (
        <FolderNode key={folder.name} folder={folder} />
      ))}
    </div>
  );
};

const FolderNode: React.FC<{ folder: Folder }> = ({ folder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-2">
      <button
        type="button"
        className="flex items-center cursor-pointer hover:text-blue-600 bg-transparent border-0 p-0"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={
          open
            ? `Collapse folder ${folder.name}`
            : `Expand folder ${folder.name}`
        }
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="ml-1 font-medium">{folder.name}</span>
      </button>

      {open && (
        <div className="ml-4 mt-1 space-y-1">
          {Array.isArray(folder.folders) &&
            folder.folders.map((sub) => (
              <FolderNode key={sub.name} folder={sub} />
            ))}

          {Array.isArray(folder.files) &&
            folder.files.map((file) => (
              <a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-700 hover:underline ml-4"
                aria-label={`Download ${file.name}`}
              >
                <FileText size={12} />
                {file.name}
              </a>
            ))}
        </div>
      )}
    </div>
  );
};
