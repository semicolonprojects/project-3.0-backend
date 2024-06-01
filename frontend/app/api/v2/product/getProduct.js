import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getProducts(category) {
  try {
    let response;
    if (!category) {
      response = await axios.get(`${API_URL}/api/v1/products?all`);
    } else {
      response = await axios.get(`${API_URL}/api/v1/products?data=${category}`);
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
