export type CategoryStatus = "listed" | "unlisted";
export interface Category {
  id: string;
  title: string;
  isListed: boolean;
}
