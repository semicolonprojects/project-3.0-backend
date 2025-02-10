import axios from "axios";

export const fetchPdf = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pdf`,
            {
                responseType: "blob",
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch PDF: " + error.message);
    }
};
