"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Edit = ({ params }) => {
    const [services, setServices] = useState([]);
    const [resiData, setResiData] = useState({
        kode_resi: "",
        nama_pelanggan: "",
        title: "",
        status_pengerjaan: "",
        category_id: "",
        penerima: "",
        pengirim: "",
        id: "",
    });
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services?data=all`
                );
                setServices(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchResiDetails = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${id}`
                );
                const res = data[0];

                setResiData({
                    kode_resi: res.kode_resi,
                    nama_pelanggan: res.nama_pelanggan,
                    title: res.kode_resi,
                    status_pengerjaan: res.status_pengerjaan,
                    service_id: res.service_id,
                    penerima: res.penerima,
                    pengirim: res.pengirim,
                    id: res.id,
                });
            } catch (error) {
                toast.error(error, { position: "bottom-right" });
            }
        };

        fetchCategories();
        if (id) fetchResiDetails();
    }, [id]);

    const updateResi = async (e) => {
        e.preventDefault();
        toast.loading("Loading ...", { position: "bottom-right" });

        const formData = new FormData();
        Object.entries(resiData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("_method", "PUT");

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${resiData.kode_resi}`,
                formData
            );
            toast.dismiss();
            toast.success(data, { position: "bottom-right" });
            router.push("/dashboard/resi");
        } catch (error) {
            toast.dismiss();
            handleErrorResponse(error);
        }
    };

    const handleErrorResponse = (error) => {
        if (
            error.response &&
            error.response.status === 422 &&
            error.response.data.errors
        ) {
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
    };

    return (
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
                        Edit Resi {resiData.title}{" "}
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
                                    defaultValue={resiData.kode_resi}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            kode_resi: e.target.value,
                                        }))
                                    }
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
                                    defaultValue={resiData.nama_pelanggan}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            nama_pelanggan: e.target.value,
                                        }))
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
                                    value={resiData.status_pengerjaan}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            status_pengerjaan: e.target.value,
                                        }))
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
                                        Category
                                    </label>
                                    <Link href="/dashboard/services/category">
                                        <p className="text-right block mb-2 text-sm font-medium text-gray-900">
                                            Manage Category
                                        </p>
                                    </Link>
                                </div>

                                {services.length > 0 ? (
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={resiData.service_id}
                                        onChange={(e) =>
                                            setResiData((prev) => ({
                                                ...prev,
                                                service_id: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {services.map((service, index) => (
                                            <option
                                                key={index}
                                                value={service.id}
                                            >
                                                {service.nama_service} -{" "}
                                                {service.category}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        Loading....
                                    </p>
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
                                    value={resiData.pengirim}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            pengirim: e.target.value,
                                        }))
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
                                    value={resiData.penerima}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            penerima: e.target.value,
                                        }))
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
    );
};

export default Edit;
