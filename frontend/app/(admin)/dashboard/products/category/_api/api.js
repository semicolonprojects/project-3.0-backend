import axios from "axios";

export const getCategoryProducts = async (currentPage) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/productsCategory?page=${currentPage}`
    );
    return response.data;
};

export const deleteCategoryProducts = async (categoryProduct) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/productsCategory/${categoryProduct}`
    );
    return response.data;
};

export const detailCategoryProduct = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/productsCategory/${id}`
    );
    return response.data;
};

export const updateCategory = async (id, formData) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/productsCategory/${id}`,
        formData
    );

    return response.data;
};

export const getAllCategory = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/allProductsCategory`
    );

    return response.data;
};

export const createProductCategory = async (formData) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/productsCategory`,
        formData
    );

    return response.data;
};
