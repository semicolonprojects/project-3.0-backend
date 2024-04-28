import axios from "axios";

export const getProducts = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`
    );
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${productId}`
    );
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
        product
    );
    return response.data;
};
