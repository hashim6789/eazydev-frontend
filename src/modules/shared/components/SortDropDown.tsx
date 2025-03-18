import React from "react";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  sort: string; // Current sort value
  options: SortOption[]; // Array of sort options
  handleSortChange: (value: any) => void; // Function to handle sort changes
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
