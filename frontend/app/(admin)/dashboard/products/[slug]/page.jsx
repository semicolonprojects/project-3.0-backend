"use client";

import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { detailProduct } from "../_api/api.js";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import toast from "react-hot-toast";
import { getAllCategory } from "../category/_api/api.js";

const Page = ({ params }) => {
    const fileTypes = ["jpg", "png", "jpeg"];

    const [file, setFile] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productId, setProductId] = useState("");
    const [templateMessage, setTemplateMessage] = useState("");
    const [description, setDescription] = useState("");
    const [getCategory, setGetCategory] = useState([]);

    const router = useRouter();

    const handleChange = (file) => {
        setFile(file);
    };

    useEffect(() => {
        const detail = async () => {
            try {
                const productData = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${params.slug}`
                );
                const res = productData.data.data;

                const cateogry = await getAllCategory();
                setGetCategory(cateogry.data);

                setProductName(res.product_name);
                setProductTitle(res.product_name);
                setProductPrice(res.price);
                setProductCategory(res.category);
                setTemplateMessage(res.whatsapp_link);
                setDescription(res.description);
                setProductId(res.id);
            } catch (error) {
                console.log(error);
            }
        };

        detail();
    }, []);

    const updateProduct = async (e) => {
        e.preventDefault();

        toast.loading("Loading ... ", {
            position: "bottom-right",
        });

        const formData = new FormData();

        //append data to "formData"
        formData.append("product_name", productName);
        formData.append("slug", productName.trim());
        formData.append("price", productPrice);
        formData.append("category", productCategory);
        formData.append("_method", "PUT");
        formData.append("image", file);
        formData.append("template_message", templateMessage);
        formData.append("description", description);

        await axios
            .post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${productId}`,
                formData
            )
            .then(async (response) => {
                // Make the callback function async
                toast.dismiss();
                toast.success(response.data, {
                    position: "bottom-right",
                });

                // Add await here to wait for the asynchronous operation to complete
                await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage-link`
                );

                router.back();
            })
            .catch((error) => {
                toast.dismiss();
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
            });
    };
    return (
        <div className="p-4 ml-80">
            <div className="py-20 pb-10">
                <div className="grid grid-flow-col gap-6 w-fit">
                    <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                        <svg
                            className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]  "
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
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold py-5">
                        Products Content Management
                    </h1>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
                <div className="mx-5">
                    <p className="text-lg font-semibold text-gray-900 mb-5">
                        Edit Products {productTitle}
                    </p>
                    <form
                        className="max-w-4xl"
                        encType="multipart/form-data"
                        onSubmit={updateProduct}
                    >
                        <div className="mb-5 grid md:grid-flow-col max-w-4xl gap-5">
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Product Name
                                </label>
                                <input
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                                    placeholder="Product Name"
                                    required
                                />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <div className="grid grid-flow-col">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Category
                                    </label>
                                    <button className="text-right block mb-2 text-sm font-medium text-gray-900">
                                        Manage Category
                                    </button>
                                </div>
                                {getCategory.length === 0 ? (
                                    <p>Loading categories...</p>
                                ) : (
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="category"
                                        value={productCategory}
                                        onChange={(e) =>
                                            setProductCategory(e.target.value)
                                        }
                                    >
                                        <option>Select Category</option>
                                        {getCategory.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className="mb-5 ">
                            <div className="relative z-0 w-full mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Template Pesan
                                </label>
                                <input
                                    type="text"
                                    id="templateMessage"
                                    value={templateMessage}
                                    onChange={(e) =>
                                        setTemplateMessage(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Product Description"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-5 ">
                            <div className="relative z-0 w-full mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Product Description"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-5 ">
                            <div className="relative z-0 w-full mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Price
                                </label>
                                <input
                                    value={productPrice}
                                    onChange={(e) => e.target.value}
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Product Price"
                                    required
                                />
                            </div>
                        </div>
                        <div className="relative z-0 max-w-sm h-full mb-5 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Image
                            </label>
                            <FileUploader
                                handleChange={handleChange}
                                name="image"
                                types={fileTypes}
                            />
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

export default Page;
