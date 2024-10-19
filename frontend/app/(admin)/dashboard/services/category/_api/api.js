import axios from "axios";

export const getServicesCategory = async (currentPage) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category?page=${currentPage}`
    );
    return response.data;
};

export const deleteServiceCategory = async (categoryService) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category/${categoryService}`
    );
    return response.data;
};

export const detailServiceCategory = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category/${id}`
    );
    return response.data;
};

export const updateCategory = async (id, formData) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category/${id}`,
        formData
    );

    return response.data;
};

export const getAllCategory = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services?data=all`
    );

    return response.data;
};

export const createServiceCategory = async (formData) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category`,
        formData
    );

    return response.data;
};
