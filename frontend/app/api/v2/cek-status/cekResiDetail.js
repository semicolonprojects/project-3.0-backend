import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function CekResi(kode_resi) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/getResiDetail/${kode_resi}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export default CekResi;
