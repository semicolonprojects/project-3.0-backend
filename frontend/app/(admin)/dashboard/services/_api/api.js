import axios from "axios";

export const getServices = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services`
    );
    return response.data;
};

export const getService = async (slug) => {
    const response = await axios.get (
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${slug}`
    );
    return response.data;
};

export const deleteService = async (slug) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${slug}`
    );
    return response.data;
};

export const createService = async (data) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services`,
        data
    );
    return response.data;
};
