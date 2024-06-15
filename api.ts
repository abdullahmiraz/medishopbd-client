const baseUrl = `http://localhost:3002`;

export const getInventoryDetails = async () => {
  const res = await fetch(`${baseUrl}/product_categories/`, {
    cache: "no-store",
  });
  const productCategories = await res.json();
  const medicineProducts = productCategories;
  // const medicineProducts = productCategories.medicine;
  return medicineProducts;
};

export const updateProduct = async (
  id: string,
  updatedData: any
): Promise<any> => {
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update product with id ${id}`);
  }

  const updatedProduct = await res.json();
  return updatedProduct;
};

export const getAllUsersDetails = async (): Promise<any[]> => {
  const res = await fetch(`${baseUrl}/users`, { cache: "no-store" });
  const usersList = await res.json();
  return usersList;
};

export const getAllSalesDetails = async (): Promise<any[]> => {
  const res = await fetch(`${baseUrl}/sales`, { cache: "no-store" });
  const salesDetails = await res.json();
  return salesDetails;
};
