"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
    getAllCategory,
    getStatusPengerjaan,
} from "../../services/category/_api/api";
import axios from "axios";

function Page() {
    const [resiData, setResiData] = useState({
        resiCode: "",
        resiName: "",
        resiStatus: "",
        service: "",
        recipient: "",
        sender: "",
    });

    const [getCategory, setGetCategory] = useState([]);
    const [getNomorResi, setNomorResi] = useState("");
    const [getStatusPengerjaanOptions, setGetStatusPengerjaanOptions] =
        useState([]);

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResiData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchCategory = async () => {
            const controller = new AbortController();
            const { signal } = controller;

            try {
                const [
                    categoriesResponse,
                    statusPengerjaanResponse,
                    nomorResiResponse,
                ] = await Promise.all([
                    getAllCategory({ signal }),
                    getStatusPengerjaan({ signal }),
                    axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/generate-resi`
                    ),
                ]);

                const { data: categories } = categoriesResponse;
                const statusPengerjaan = statusPengerjaanResponse;
                const { data: nomorResi } = nomorResiResponse;
                setNomorResi(nomorResi);

                if (categories && statusPengerjaan) {
                    setGetCategory(categories);
                    setGetStatusPengerjaanOptions(statusPengerjaan);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    toast.error("Error", { position: "bottom-right" });
                }
            }

            return () => controller.abort();
        };

        fetchCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Loading ...", {
            position: "bottom-right",
        });

        const formData = new FormData();
        const formattedResi = getNomorResi;

        formData.append("kode_resi", formattedResi);
        formData.append("nama_pelanggan", resiData.resiName);
        formData.append("status_pengerjaan", resiData.resiStatus);
        formData.append("service_id", resiData.service);
        formData.append("pengirim", resiData.sender);
        formData.append("penerima", resiData.recipient);

        const showToast = (message, type = "success") => {
            toast.dismiss(loadingToast);
            toast[type](message, {
                position: "bottom-right",
            });
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi`,
                formData
            );

            if (response.status === 200) {
                showToast("Berhasil Menambahkan Resi", "success");
                router.push(`/dashboard/resi`);
            } else {
                showToast("Gagal Menambahkan Resi", "error");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data || "Gagal Menambah Data Harap Coba Lagi";
            showToast(errorMessage, "error");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <>
            <div className="p-4 ml-80">
                <div className="py-20 pb-10">
                    <div className="grid grid-flow-col gap-6 w-fit">
                        <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                            <svg
                                className="flex-shrink-0 w-10 h-11 drop-shadow-lg shadow-black text-[#3f8ac7] "
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                <path d="M13 5v2" />
                                <path d="M13 17v2" />
                                <path d="M13 11v2" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold py-5">
                            Resi Content Management
                        </h1>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
                    <div className="mx-5">
                        <p className="text-lg font-semibold text-gray-900 mb-5">
                            Create New Resi{" "}
                        </p>
                        <form
                            className=" max-w-4xl"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
                                <div className="relative z-0 w-full mb-5 group">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        No Resi
                                    </label>
                                    <input
                                        type="text"
                                        name="resiCode"
                                        value={getNomorResi}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                                        placeholder="Resi Code"
                                        disabled
                                    />
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nama Pelanggan
                                    </label>
                                    <input
                                        type="text"
                                        name="resiName"
                                        value={resiData.resiName}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                                        placeholder="Nama Pelanggan"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-flow-col max-w-4xl gap-5 ">
                                <div className="relative z-0 w-full mb-5 group">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Status Pengerjaan
                                    </label>
                                    <select
                                        type="text"
                                        name="resiStatus"
                                        value={resiData.resiStatus}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Status Pengerjaan"
                                    >
                                        <option value="">Select Status</option>

                                        {getStatusPengerjaanOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option.value}
                                                >
                                                    {option.value}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <div className="grid grid-flow-col w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Services
                                        </label>
                                        <Link href="/dashboard/services">
                                            <p className="text-right block mb-2 text-sm font-medium text-gray-900">
                                                Manage Services
                                            </p>
                                        </Link>
                                    </div>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="service"
                                        value={resiData.service}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {getCategory.map(
                                            (categoryList, index) => (
                                                <option
                                                    key={index}
                                                    value={categoryList.id}
                                                >
                                                    {categoryList.nama_service}{" "}
                                                    - {categoryList.category}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="grid md:grid-flow-col max-w-4xl gap-5">
                                <div className="relative z-0 max-w-4xl mb-5 group">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nama Pengirim
                                    </label>
                                    <input
                                        type="text"
                                        name="sender"
                                        value={resiData.sender}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Nama Pengirim"
                                    />
                                </div>
                                <div className="relative z-0 max-w-md mb-5 group">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nama Penerima
                                    </label>
                                    <input
                                        type="text"
                                        name="recipient"
                                        value={resiData.recipient}
                                        onChange={handleInputChange}
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
        </>
    );
}

export default Page;
