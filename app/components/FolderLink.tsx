"use client";

import Link from "next/link";
import { Folder } from "lucide-react";

type FolderLinkProps = {
  href: string;
  label: string;
  className?: string;
  ariaLabel?: string;
};

export default function FolderLink({
  href,
  label,
  className = "",
  ariaLabel,
}: FolderLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-4 border border-gray-200 hover:border-purple-600 rounded-lg shadow-sm transition-colors hover:bg-gray-50 ${className}`}
      aria-label={ariaLabel || `Open folder ${label}`}
    >
      <Folder className="w-5 h-5 text-purple-600" />
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </Link>
  );
}
