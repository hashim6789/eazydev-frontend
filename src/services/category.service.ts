import axios from "axios";
import { Category, FilterOption } from "../types";

export const fetchCategoriesAsFilterOptions = async (): Promise<
  FilterOption[]
> => {
  try {
    // Fetch categories from the API
    const response = await axios.get<Category[]>("/api/categories");
    const categories = response.data;

    // Map categories to FilterOption format
    return categories.map((category) => ({
      value: category.id,
      label: category.title,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
