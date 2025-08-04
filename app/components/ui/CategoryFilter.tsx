// components/ui/CategoryFilter.tsx
"use client";

import Button from "./Button";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  className = "",
}: CategoryFilterProps) {
  return (
    <div className={`flex justify-center flex-wrap gap-3 ${className}`}>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          onClick={() => onSelect(cat)}
          className="rounded-full px-5 py-2 text-sm"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
