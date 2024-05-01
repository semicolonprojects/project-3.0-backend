import axios from "axios";

export const getServices = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services`
    );
    return response.data;
};

export const deleteService = async (serviceId) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${serviceId}`
    );
    return response.data;
};

export const createService = async (service) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services`,
        service
    );
    return response.data;
};