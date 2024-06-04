import axios from "axios";

export const getCategoryArtikel = async (currentPage) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category?page=${currentPage}`
  );
  return response.data;
};

export const createArtikelCategory = async (artikelCategory) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category`,
    artikelCategory
  );
  return response.data;
};

export const updateArtikelCategory = async (
  artikel_category,
  updatedArtikelCategory
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category/${artikel_category}`,
    updatedArtikelCategory
  );
  return response.data;
};

export const deleteArtikel = async (artikel_category) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category/${artikel_category}`
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category`
  );
  return response.data;
};

export const detailArtikelCategory = async (artikel_category) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category/${artikel_category}`
  );
  return response.data;
};
