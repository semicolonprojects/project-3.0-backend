import axios from "axios";

export const getTokos = async (search, currentPage) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/toko?search=${search}&page=${currentPage}`
    );
    return response.data;
};
