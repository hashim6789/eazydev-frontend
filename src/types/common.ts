export interface Path {
  title: string;
  link: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface PaginatedData<T> {
  body: T[];
  total: number;
  page: number;
  last_page: number;
}
