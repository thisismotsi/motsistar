"use client";

import { useState } from "react";
import ResourceNav from "../ResourceNav";
import Input from "../ui/Input";

type Props = {
  children: React.ReactNode;
};

export default function ResourceLayout({ children }: Props) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="p-6 relative pt-24 px-4">
      <h1 className="text-2xl font-semibold mb-4">Resource Library</h1>

      <ResourceNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Input placeholder="Search resources by code or topic..." />

      {!activeTab && children}
    </div>
  );
}
