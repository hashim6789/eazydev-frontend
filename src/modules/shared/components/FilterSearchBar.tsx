import React from "react";

interface FilterSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (filter: string) => void;
  placeholder?: string;
  options: string[]; // Array of filter options
  styles: {
    border: string;
    inputFocus: string;
    textPrimary?: string;
    textSecondary?: string;
  }; // Styles from `useThemeStyles` or passed manually
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  placeholder = "Search...", // Default placeholder text
  options,
  styles,
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`flex-1 px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
      />
      {/* Filter Dropdown */}
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className={`px-4 py-2 rounded-md border ${styles.border} ${styles.inputFocus} bg-transparent`}
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
            {/* Capitalize */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSearchBar;
