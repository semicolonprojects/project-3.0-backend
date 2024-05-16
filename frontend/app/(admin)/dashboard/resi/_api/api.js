import axios from "axios";

export const getResis = async (currentPage) => {
    const response = await axios.get (
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi?page=${currentPage}`
    );
    return response.data;
};

export const getResi = async (id) => {
  const response = await axios.get (
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${id}`
  );
  return response.data;
};

export const deleteResi = async (id) => {
  const response = await axios.delete (
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${id}`,
  );
  return response.data;
};

export const createResi = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi`,
    data
  );
  return response.data;
};