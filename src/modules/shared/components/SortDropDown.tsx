import React from "react";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  sort: string;
  options: SortOption[];
  handleSortChange: (value: any) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sort,
  options,
  handleSortChange,
}) => {
  return (
    <select
      value={sort}
      onChange={(e) => handleSortChange(e.target.value)}
      className="px-4 py-2 border rounded-md"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
