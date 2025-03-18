import { FilterOption } from "../../../types";

interface FilterDropdownProps {
  selectedValue: string; // Current selected filter value
  options: FilterOption[]; // Array of filter options (dynamic)
  handleFilterChange: (value: any) => void; // Function to handle filter changes
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedValue = "all",
  options,
  handleFilterChange,
}) => (
  <select
    value={selectedValue}
    onChange={(e) => handleFilterChange(e.target.value)}
    className="px-4 py-2 border rounded-md"
  >
    <option key="all" value="all">
      All
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default FilterDropdown;
