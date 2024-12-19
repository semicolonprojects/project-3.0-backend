"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import Link from "next/link";
import {
    getAllCategory,
    getStatusPengerjaan,
} from "../../services/category/_api/api";
import axios from "axios";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const fileTypes = ["jpg", "png", "jpeg"];

function Page() {
    const [resiData, setResiData] = useState({
        resiCode: "",
        resiName: "",
        resiStatus: "",
        service: [],
        recipient: "",
        nama_item: [],
    });


    const [getNomorResi, setNomorResi] = useState("");
    const [fields, setFields] = useState([{ image: null, imagePreview: null }]);
    const [services, setServices] = useState([{ id: "", service: "" }]);

    const [getCategory, setGetCategory] = useState([]);
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

    const handleAddField = () => {
        setFields([...fields, { image: null }]);
    };

    const handleRemoveField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const handleChange = (file, index) => {
        const updatedFields = [...fields];
        updatedFields[index].image = file;
        const preview = URL.createObjectURL(file);
        updatedFields[index].imagePreview = preview;
        setFields(updatedFields);
    };

    const handleInputChangeService = (e) => {
        const { name, value } = e.target;
        const index = name.match(/\[(\d+)\]/)[1];

        setResiData((prevData) => {
            const updatedService = [...prevData.service];
            updatedService[index] = value;
            return { ...prevData, service: updatedService };
        });
    };

    const handleAddFieldService = () => {
        setServices([...services, { id: "", service: "" }]);
    };

    const handleRemoveFieldService = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
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
        formData.append("pengirim", resiData.sender);
        formData.append("penerima", resiData.recipient);

        fields.forEach((field, index) => {
            if (field.image) {
                formData.append("images[]", field.image);
            }
        });

        resiData.service.forEach(service => {
            formData.append("service[]", service);
        });

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
                await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage-link`
                );
                router.push(`/dashboard/resi/form/${formattedResi}`)
            } else {
                showToast("Gagal Menambahkan Resi", "error");
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                showToast(error?.response?.data?.error, "error");
            }
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
                            <div className="max-w-4xl mx-auto">
                                <div className="relative z-0 w-full mb-5 group">
                                    {fields.map((field, index) => (
                                        <div key={index} className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Image {index + 1}
                                            </label>

                                            <div className="flex items-center space-x-4">
                                                <FileUploader
                                                    handleChange={(e) =>
                                                        handleChange(e, index)
                                                    }
                                                    name={`image-${index}`}
                                                    types={fileTypes}
                                                    className="w-full border-2 border-gray-300 p-4 rounded-lg shadow-sm hover:border-blue-500 focus:border-blue-500"
                                                />

                                                {fields.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRemoveField(
                                                                index
                                                            )
                                                        }
                                                        className="p-2 text-red-600 hover:text-red-800"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                        <span className="sr-only">
                                                            Remove Image{" "}
                                                            {index + 1}
                                                        </span>
                                                    </button>
                                                )}
                                            </div>

                                            {field.image && (
                                                <div className="mt-4 relative z-0 w-full">
                                                    <img
                                                        src={field.imagePreview}
                                                        alt={`Image Preview ${index + 1
                                                            }`}
                                                        className="w-full h-auto max-w-full rounded-lg shadow-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={handleAddField}
                                        className="flex items-center space-x-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                                    >
                                        <PlusIcon className="h-5 w-5" />
                                        <span>Add Image</span>
                                    </button>
                                </div>
                            </div>
                            {/* Submit and Navigation Buttons */}
                            <div className="flex flex-row justify-between pt-6">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
                                >
                                    Submit and Go to Manage Items
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
