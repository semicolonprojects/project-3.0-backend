"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCategory } from "../../_api/api.js";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Edit = ({ params }) => {
  const [categories, setCategory] = useState([]);
  const [resiCode, setResiCode] = useState("");
  const [resiName, setResiName] = useState("");
  const [resiTitle, setResiTitle] = useState("");
  const [resiStatus, setResiStatus] = useState("");
  const [oldCategory, setOldCategory] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [resiId, setResiId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/service-category`
        );
        const categories = response.data.data;
        console.log(response.data);
        // Access data array if needed
        setCategory(categories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        // Handle errors here (e.g., display an error message to the user)
      }
    };

    const detail = async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${params.id}`
        );
        const res = data.data.data;
        setResiCode(res.kode_resi);
        setResiTitle(res.kode_resi);
        setResiName(res.nama_pelanggan);
        setResiStatus(res.status_pengerjaan);
        setOldCategory(res.category_id);
        setRecipient(res.penerima);
        setSender(res.pengirim);
        setResiId(res.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
    detail();
  }, [params.id]);

  const updateResi = async (e) => {
    e.preventDefault();
    toast.loading("Loading ...", {
      position: "bottom-right",
    });

    const formData = new FormData();

    formData.append("kode_resi", resiCode);
    formData.append("nama_pelanggan", resiName);
    formData.append("status_pengerjaan", resiStatus);
    formData.append("_method", "PUT");
    formData.append("category_id", oldCategory);
    formData.append("pengirim", sender);
    formData.append("penerima", recipient);
    console.log("🚀 ~ updateResi ~ response:", formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${resiId}`,
        formData
      );
      console.log("🚀 ~ updateResi ~ response:", response);
      toast.dismiss();
      toast.success(response.data, {
        position: "bottom-right",
      });
      router.push("/dashboard/resi");
    } catch (error) {
      toast.dismiss();
      if (error.response.status === 422 && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((errorMessage) => {
            toast.error(`${field}: ${errorMessage}`, {
              position: "bottom-right",
            });
          });
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="p-4 ml-80">
      <div className="py-20 pb-10">
        <div className="grid grid-flow-col gap-6 w-fit">
          <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
            <svg
              class="flex-shrink-0 w-10 h-11 drop-shadow-lg shadow-black text-[#3f8ac7] "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold py-5">Resi Content Management</h1>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
        <div className="mx-5">
          <p className="text-lg font-semibold text-gray-900 mb-5">
            Edit Service {resiTitle}{" "}
          </p>
          <form
            className=" max-w-4xl"
            onSubmit={updateResi}
            encType="multipart/form-data"
          >
            <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
              <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  No Resi
                </label>
                <input
                  type="text"
                  defaultValue={resiCode}
                  onChange={(e) => setResiCode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                  placeholder="Resi Code"
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  defaultValue={resiName}
                  onChange={(e) => setResiName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                  placeholder="Nama Pelanggan"
                  required
                />
              </div>
            </div>
            <div class="grid md:grid-flow-col max-w-4xl gap-5 ">
              <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Status Pengerjaan
                </label>
                <select
                  type="text"
                  value={resiStatus}
                  onChange={(e) => setResiStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Status Pengerjaan"
                  required
                >
                  <option selected>Select Status</option>
                  <option>Belum Dikerjakan</option>
                  <option>Sedang Dikerjakan</option>
                  <option>Dikirim</option>
                  <option>Selesai</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <div className="grid grid-flow-col w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <Link href="/dashboard/services/category">
                    <label className="text-right block mb-2 text-sm font-medium text-gray-900">
                      Manage Category
                    </label>
                  </Link>
                </div>

                {categories.length > 0 ? ( // Render only if categories have data
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={oldCategory}
                    onChange={(e) => setOldCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={category.id === oldCategory}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Loading categories...</p> // Display a loading message or placeholder
                )}
              </div>
            </div>
            <div className="grid md:grid-flow-col max-w-4xl gap-5">
              <div className="relative z-0 max-w-4xl mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  id="sender"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Pengirim"
                />
              </div>
              <div class="relative z-0 max-w-md mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Penerima"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
