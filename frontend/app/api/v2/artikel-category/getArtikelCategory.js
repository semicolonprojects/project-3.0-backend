import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getArtikelCategory() {
  try {
    const response = await axios.get(`${API_URL}/api/v1/artikel_category`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
