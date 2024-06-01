import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getPromo() {
  try {
    const response = await axios.get(`${API_URL}/api/v1/showPromoNavbar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
