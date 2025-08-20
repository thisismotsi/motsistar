// 7. TurboWarp Scratch
// Scratch Integration - Open Project Viewer
import { useState } from "react";

export default function Scratch() {
  const [projectId, setProjectId] = useState("701285360"); // example project

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };

  const handleOpen = () => {
    const url = `https://scratch.mit.edu/projects/${projectId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-lg mb-2">Open Scratch Project</h2>
      <input
        className="border px-2 py-1 mr-2"
        type="text"
        value={projectId}
        onChange={handleChange}
        placeholder="Enter Scratch Project ID"
      />
      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open
      </button>
    </div>
  );
}
