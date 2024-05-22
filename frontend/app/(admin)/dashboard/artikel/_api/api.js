import axios from "axios";

export const getArtikel = async (currentPage) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel?page=${currentPage}`
  );
  return response.data;
};

export const createArtikel = async (artikel) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel`,
    artikel
  );
  return response.data;
};

export const updateArtikel = async (slug, updatedArtikel) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel/${slug}`,
    updatedArtikel
  );
  return response.data;
};

export const deleteArtikel = async (artikelId) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel/${artikelId}`
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel_category`
  );
  return response.data;
};

export const detailArtikel = async (slug) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/artikel/${slug}`
  );
  return response.data;
};
