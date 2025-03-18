interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  handleSearchChange,
}) => (
  <input
    type="text"
    placeholder="Search users..."
    value={searchQuery}
    onChange={(e) => handleSearchChange(e.target.value)}
    className="px-4 py-2 border rounded-md"
  />
);
