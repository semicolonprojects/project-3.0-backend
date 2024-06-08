import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function showArtikel(slug) {
  try {
    const response = await axios.get(`${API_URL}/api/v1/artikel/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getAllArtikel(categoryId) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/rekomendasiArtikel/${categoryId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
