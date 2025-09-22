"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getStatusPengerjaan } from "../../../services/category/_api/api";
import { FileUploader } from "react-drag-drop-files";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const Edit = ({ params }) => {
    const fileTypes = ["jpg", "png", "jpeg"];
    const [fields, setFields] = useState([{ image: null, imagePreview: null }]);
    const [statusPengerjaanOptions, setStatusPengerjaanOptions] = useState([]);
    const [getTokos, setGetTokos] = useState([]);
    const [resiData, setResiData] = useState({
        id_toko: "",
        nama_pelanggan: "",
        title: "",
        status_pengerjaan: "",
        category_id: "",
        penerima: "",
        pengirim: "",
        id: "",
        ongkir: "",
    });
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services?data=all`
                );
                const tokos = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/toko?all=true`
                );
                const statusPengerjaan = await getStatusPengerjaan();
                setStatusPengerjaanOptions(statusPengerjaan);
                setGetTokos(tokos.data);
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
                    id_toko: res.id_toko,
                    nama_pelanggan: res.nama_pelanggan,
                    title: res.kode_resi,
                    status_pengerjaan: res.status_pengerjaan,
                    penerima: res.penerima,
                    pengirim: res.pengirim,
                    id: res.id,
                    image: res.images,
                    ongkir: res.ongkir,
                });
            } catch (error) {
                toast.error(error, { position: "bottom-right" });
            }
        };

        fetchCategories();
        if (id) fetchResiDetails();

        if (resiData.images && resiData.images.length > 0) {
            const initialFields = resiData.image.map((img) => ({
                imagePreview: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/cek_resi/${img.name}`,
                image: img,
            }));
            setFields(initialFields);
        }
    }, [id]);

    useEffect(() => {
        if (resiData.image && resiData.image.length > 0) {
            const initialFields = resiData.image.map((img) => ({
                imagePreview: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/cek_resi/${img.name}`,
                image: img,
            }));
            setFields(initialFields);
        }
    }, [resiData]);

    const updateResi = async (e) => {
        e.preventDefault();
        toast.loading("Loading ...", { position: "bottom-right" });

        const formData = new FormData();
        formData.append("id_toko", resiData.id_toko);
        formData.append("nama_pelanggan", resiData.nama_pelanggan);
        formData.append("status_pengerjaan", resiData.status_pengerjaan);
        formData.append("pengirim", resiData.penerima);
        formData.append("penerima", resiData.pengirim);
        formData.append("ongkir", resiData.ongkir || 0);

        fields.forEach((field, index) => {
            if (field.image) {
                formData.append("images[]", field.image);
                formData.append("names[]", field.image.name);
            }
        });
        formData.append("_method", "PUT");

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cekresi/${params.id}`,
                formData
            );
            toast.dismiss();
            toast.success(data, { position: "bottom-right" });
            await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage-link`
            );
            router.push(`/dashboard/resi/form/${params.id}`);
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

    const handleChange = (file, index) => {
        const updatedFields = [...fields];
        const preview = URL.createObjectURL(file);
        updatedFields[index].image = file;
        updatedFields[index].imagePreview = preview;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, { imagePreview: null }]);
    };

    const handleRemoveField = (index) => {
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
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
                                    Toko
                                </label>
                                <select
                                    type="text"
                                    name="id_toko"
                                    value={resiData.id_toko}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            id_toko: e.target.value,
                                        }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Status Pengerjaan"
                                >
                                    <option value="">Select Toko</option>

                                    {getTokos.map((toko, index) => (
                                        <option key={index} value={toko.id}>
                                            {toko.nama_toko}
                                        </option>
                                    ))}
                                </select>
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
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-flow-col max-w-4xl gap-5 ">
                            <div className="relative z-0 w-full mb-5 group">
                                <label
                                    htmlFor="statusPengerjaan"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Status Pengerjaan
                                </label>
                                <select
                                    id="statusPengerjaan"
                                    value={resiData.status_pengerjaan || ""}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            status_pengerjaan: e.target.value,
                                        }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    aria-label="Status Pengerjaan"
                                >
                                    {statusPengerjaanOptions.map(
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
                        <div className="grid md:grid-flow-col max-w-4xl gap-5">
                            <div className="relative z-0 max-w-4xl mb-5 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Pick Up & Delivery
                                </label>
                                <input
                                    type="number"
                                    name="ongkir"
                                    value={resiData.ongkir}
                                    onChange={(e) =>
                                        setResiData((prev) => ({
                                            ...prev,
                                            ongkir: e.target.value,
                                        }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Picku Up & Delivery"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5">
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
                                                        handleRemoveField(index)
                                                    }
                                                    className="p-2 text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                    <span className="sr-only">
                                                        Remove Image {index + 1}
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                        {field.imagePreview && (
                                            <div className="mt-4 relative z-0 w-full">
                                                <img
                                                    src={field.imagePreview}
                                                    alt={`Image Preview ${
                                                        index + 1
                                                    }`}
                                                    className="w-full h-auto max-w-full rounded-lg shadow-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
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

                        <div className="flex flex-row justify-between pt-6">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 text-white font-semibold
                                rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform
                                hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
                            >
                                Submit and Go to Manage Items
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;
