import axios from "axios";

export const getProducts = async (currentPage) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?page=${currentPage}`
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

export const detailProduct = async (slug) => {
    const products = await getProducts();
    return products.data.find((product) => product.slug === slug);
};
