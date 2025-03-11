export type CategoryStatus = "listed" | "unlisted";
export interface Category {
  id: string;
  title: string;
  status: CategoryStatus;
  isListed: boolean;
}
