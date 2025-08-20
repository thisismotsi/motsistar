// components/ResourceCard.tsx
import { Download } from "lucide-react";

interface ResourceCardProps {
  title: string;
  file: string;
}

export default function ResourceCard({ title, file }: ResourceCardProps) {
  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-md transition flex items-center justify-between">
      <span className="text-sm font-medium">{title}</span>
      <a
        href={file}
        download
        className="text-purple-600 hover:text-purple-800"
        aria-label={`Download ${title}`}
      >
        <Download className="w-5 h-5" />
      </a>
    </div>
  );
}
