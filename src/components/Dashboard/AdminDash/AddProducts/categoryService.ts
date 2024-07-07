import { serverUrl } from "../../../../../api";

// Fetch categories
export const fetchCategories = async (): Promise<
  { _id: string; name: string }[]
> => {
  const response = await fetch(`${serverUrl}/api/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

// Fetch sub-categories based on primary category ID
export const fetchSubCategories = async (
  primaryCategoryId: string
): Promise<{ _id: string; name: string }[]> => {
  const response = await fetch(
    `${serverUrl}/api/categories/${primaryCategoryId}/subcategories`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sub-categories");
  }
  return response.json();
};
