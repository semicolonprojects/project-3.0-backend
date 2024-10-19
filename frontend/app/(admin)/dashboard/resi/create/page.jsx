"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { getAllCategory } from "../../services/category/_api/api";

function Page() {
    const [resiCode, setResiCode] = useState("");
    const [resiName, setResiName] = useState("");
    const [resiStatus, setResiStatus] = useState("");
    // const [category, setCategory] = useState("");
    const [service, setService] = useState("");
    const [recipient, setRecipient] = useState("");
    const [sender, setSender] = useState("");
    const [getCategory, setGetCategory] = useState([]);
    const router = useRouter();

    const handleResiChange = (event) => {
        setResiCode(event.target.value);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categories = await getAllCategory();
                const res = categories.data;
                setGetCategory(res);
            } catch (error) {
                throw error;
            }
        };
        fetchCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Loading ...", {
            position: "bottom-right",
        });

        const formData = new FormData();
        const formattedResi = `NETT-${resiCode}`;

        formData.append("kode_resi", formattedResi);
        formData.append("nama_pelanggan", resiName);
        formData.append("status_pengerjaan", resiStatus);
        formData.append("service_id", service);
        formData.append("pengirim", sender);
        formData.append("penerima", recipient);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi`,
                formData
            );

            if (response.status === 200) {
                toast.dismiss();
                toast.success("Berhasil Menambahkan Resi", {
                    position: "bottom-right",
                });
                router.push(`/dashboard/resi`);
            } else {
                toast.dismiss();
                toast.error("Gagal Menambahkan Resi", {
                    position: "bottom-right",
                });
            }
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
                                        id="resiCode"
                                        value={resiCode}
                                        onChange={handleResiChange}
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
                                        id="resiName"
                                        value={resiName}
                                        onChange={(e) =>
                                            setResiName(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                                        placeholder="Nama Pelanggan"
                                        required
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
                                        id="resiStatus"
                                        value={resiStatus}
                                        onChange={(e) =>
                                            setResiStatus(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Status Pengerjaan"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Belum Dikerjakan">
                                            Belum Dikerjakan
                                        </option>
                                        <option value="Sedang Dikerjakan">
                                            Sedang Dikerjakan
                                        </option>
                                        <option value="Dikirim">Dikirim</option>
                                        <option value="Selesai">Selesai</option>
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
                                        value={service}
                                        onChange={(e) =>
                                            setService(e.target.value)
                                        }
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
                                        id="sender"
                                        value={sender}
                                        onChange={(e) =>
                                            setSender(e.target.value)
                                        }
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
                                        id="recipient"
                                        value={recipient}
                                        onChange={(e) =>
                                            setRecipient(e.target.value)
                                        }
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
