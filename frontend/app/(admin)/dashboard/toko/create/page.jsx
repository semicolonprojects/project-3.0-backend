"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function Page() {
    const router = useRouter();

    const [tokoData, setTokoData] = useState({
        nama_toko: "",
        alamat_toko: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTokoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Loading ...", {
            position: "bottom-right",
        });

        const formData = new FormData();

        formData.append("nama_toko", tokoData.nama_toko);
        formData.append("alamat_toko", tokoData.alamat_toko);

        const showToast = (message, type = "success") => {
            toast.dismiss(loadingToast);
            toast[type](message, {
                position: "bottom-right",
            });
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/toko`,
                formData
            );

            if (response.status === 200) {
                showToast("Berhasil Menambahkan Toko", "success");
                await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage-link`
                );
                router.push(`/dashboard/toko`)
            } else {
                showToast("Gagal Menambahkan Resi", "error");
            }
        } catch (error) {
            if (error?.response?.status === 422) {
                showToast(error?.response?.data, "error");
            }
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <div className="p-4 ml-80">
            <div className="py-20 pb-10">
                <div className="grid grid-flow-col gap-6 w-fit">
                    <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                        <svg
                            className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]"
                            fill="none"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                            ></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold py-5">
                        Toko Content Management
                    </h1>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
                <div className="mx-5">
                    <p className="text-lg font-semibold text-gray-900 mb-5">
                        Create Toko
                    </p>
                    <form
                        className=" max-w-4xl"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Nama Toko
                                </label>
                                <input
                                    type="text"
                                    name="nama_toko"
                                    value={tokoData.nama_toko}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                                    placeholder="Nama Toko"
                                />
                            </div>
                        </div>
                        <div className="relative z-0 mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Alamat Toko
                            </label>
                            <textarea
                                name="alamat_toko"
                                value={tokoData.alamat_toko}
                                onChange={handleInputChange}
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Alamat Toko"
                            ></textarea>
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
}

export default Page;
