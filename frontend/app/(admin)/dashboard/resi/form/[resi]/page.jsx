'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { getAllCategory } from '../../../services/category/_api/api';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const [getCategory, setGetCategory] = useState([]);
    const [resiData, setResiData] = useState([
        {
            nama_item: '',
            services: [
                {
                    id: '',
                    nama: '',
                },
            ],
        },
    ]);

    const router = useRouter();

    useEffect(() => {
        const fetchCategory = async () => {
            const controller = new AbortController();
            const { signal } = controller;

            try {
                const [
                    categoriesResponse,
                    items,
                ] = await Promise.all([
                    getAllCategory({ signal }),
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/items/${params.resi}`),
                ]);

                const { data: categories } = categoriesResponse;

                if (categories) {
                    setGetCategory(categories);
                }

                if (items.status === 200) {
                    const fetchedItems = items.data.map((item) => ({
                        nama_item: item.nama_item,
                        services: item.service_id.map((service) => ({
                            id: service.id,
                            nama: service.nama_service,
                        })),
                    }));
                    setResiData(fetchedItems);
                }
            } catch (error) {

            }

            return () => controller.abort();
        };
        fetchCategory();
    }, [params.resi])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...resiData];
        updatedItems[index] = { ...updatedItems[index], [name]: value };
        setResiData(updatedItems);
    };

    const handleInputChangeService = (e, itemIndex, serviceIndex) => {
        const { value } = e.target;

        setResiData((prevData) => {
            const newData = [...prevData];
            newData[itemIndex].services[serviceIndex].id = value;
            return newData;
        });
    };

    const handleAddFieldItem = () => {
        setResiData([
            ...resiData,
            {
                nama_item: '',
                services: [{ id: '', nama: '' }],
            },
        ]);
    };

    const handleRemoveFieldItem = (index) => {
        const updatedItems = resiData.filter((_, i) => i !== index);
        setResiData(updatedItems);
    };

    const handleAddFieldService = (index) => {
        const updatedItems = [...resiData];
        updatedItems[index].services.push({ id: '', nama: '' });
        setResiData(updatedItems);
    };

    const handleRemoveFieldService = (itemIndex, serviceIndex) => {
        const updatedItems = [...resiData];
        updatedItems[itemIndex].services = updatedItems[itemIndex].services.filter(
            (_, i) => i !== serviceIndex
        );
        setResiData(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Loading ...", {
            position: "bottom-right",
        });

        const requestData = resiData.map((item) => ({
            kode_resi: params.resi,
            nama_item: item.nama_item,
            services: item.services.map((service) => ({
                id: service.id,
            })),
        }));

        const formData = new FormData();

        formData.append("kode_resi", params.resi);
        const formattedData = requestData.map(item => ({
            nama_item: item.nama_item,
            service_id: item.services.map(service => ({ id: service.id }))
        }));

        formData.append("data", JSON.stringify(formattedData));

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
                setResiData([{ nama_item: '', services: [{ id: '', nama: '' }] }]);
                router.push(`/dashboard/resi`)
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
        <div className="p-4 ml-80 max-w-7xl mx-auto">
            <div className="py-20 pb-10">
                {/* Header Section */}
                <div className="grid grid-flow-col gap-6 w-fit">
                    <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                        <svg
                            className="flex-shrink-0 w-10 h-11 drop-shadow-lg shadow-black text-[#3f8ac7]"
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
                    <h1 className="text-3xl font-bold py-5">Manage Items</h1>
                </div>

            </div>
            {/* Form Section */}
            <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
                <div className="mx-5">
                    <p className="text-lg font-semibold text-gray-900 mb-5">Create New Items</p>
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Loop through all Nama Items */}
                        {resiData.map((item, itemIndex) => (
                            <div key={itemIndex} className="space-y-6 border p-6 rounded-lg shadow-sm bg-white">
                                {/* Nama Item Input */}
                                <div className="grid md:grid-flow-col max-w-4xl gap-5">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Nama Item</label>
                                        <input
                                            type="text"
                                            name="nama_item"
                                            value={item.nama_item}
                                            onChange={(e) => handleInputChange(e, itemIndex)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                            placeholder="Nama Item"
                                        />
                                    </div>
                                </div>

                                {/* Services for this Nama Item */}
                                <div className="space-y-6">
                                    {item.services.map((service, serviceIndex) => (
                                        <div key={serviceIndex} className="relative z-0 w-full mb-6 group">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-sm font-medium text-gray-900">Service</label>
                                                <div className="flex items-center space-x-3">
                                                    <Link href="/dashboard/services">
                                                        <p className="text-right text-sm font-medium text-blue-600 hover:text-blue-800">
                                                            Manage Services
                                                        </p>
                                                    </Link>

                                                    {item.services.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFieldService(itemIndex, serviceIndex)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <TrashIcon className="w-6 h-6" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Category Select */}
                                            <select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3"
                                                name={`services[${serviceIndex}].id`}
                                                value={service.id}
                                                onChange={(e) => handleInputChangeService(e, itemIndex, serviceIndex)} // Pass indices to the handler
                                            >
                                                <option value="">Select Category</option>
                                                {getCategory.map((categoryList, index) => (
                                                    <option key={index} value={categoryList.id}>
                                                        {categoryList.nama_service} - {categoryList.category}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    ))}

                                    {/* Add Service Button */}
                                    <div className="flex justify-end mt-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAddFieldService(itemIndex)}
                                            className="flex items-center space-x-2 text-white bg-green-600 rounded-md hover:bg-green-700 px-4 py-2"
                                        >
                                            <PlusIcon className="w-5 h-5" />
                                            <span>Add Service</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Nama Item Button */}
                                <div className="flex justify-end mt-4">
                                    {resiData.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFieldItem(itemIndex)}
                                            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon className="w-6 h-6" />
                                            <span>Remove Item</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add Nama Item Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleAddFieldItem}
                                className="flex items-center space-x-2 text-white bg-green-600 rounded-md hover:bg-green-700 px-4 py-2"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Add Nama Item</span>
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 text-right">
                            <button
                                type="submit"
                                className="flex items-center space-x-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 px-6 py-3"
                            >
                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Page;
