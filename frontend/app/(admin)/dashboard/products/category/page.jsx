"use client";

import { useEffect, useState } from "react";
import {
    createProductCategory,
    deleteCategoryProducts,
    detailCategoryProduct,
    getCategoryProducts,
    updateCategory,
} from "./_api/api";
import Pagination from "./components/Pagination";
import toast from "react-hot-toast";
import Modal from "./components/Modal";
import { useRouter } from "next/navigation";

const Page = () => {
    const [search, setSearch] = useState("");
    const [currentPages, setCurrentPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showCategory, setShowCategory] = useState([]);
    const [categoryId, setCategoryId] = useState([]);

    const router = useRouter();

    useEffect(
        () => {
            const fetchCategoryProducts = async () => {
                try {
                    const categoriesData = await getCategoryProducts(
                        currentPages
                    );
                    const res = categoriesData;
                    setCategories(res.data);
                    setTotalPages(res.meta.last_page);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchCategoryProducts();
        },
        [currentPages],
        [categories]
    );

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    const filteredCategories = categories?.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteTask = async (productCategoryId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (!confirmDelete) return; // If the user cancels, do nothing

        try {
            await deleteCategoryProducts(productCategoryId);
            setCategories(
                categories.filter(
                    (category) => category.id !== productCategoryId
                )
            );
            toast.success("Product deleted successfully", {
                position: "bottom-right",
            });
            router.refresh();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = async (id) => {
        setIsOpen(true);

        if (id) {
            const res = await detailCategoryProduct(id);
            setShowCategory(res.data.name);
            setCategoryId(res.data.id);
        } else {
            setShowCategory("");
            setCategoryId(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Loading ... ", {
            position: "bottom-right",
        });

        const formData = new FormData();

        formData.append("name", showCategory);

        try {
            let res;
            if (categoryId) {
                // Editing existing category
                formData.append("_method", "PUT");
                res = await updateCategory(categoryId, formData);
                setCategories(
                    categories.map((category) => {
                        if (category.id === categoryId) {
                            return res.data;
                        }
                        return category;
                    })
                );
                toast.dismiss();
                toast.success(
                    `Category updated successfully: ${res.data.name}`,
                    {
                        position: "bottom-right",
                    }
                );
            } else {
                // Creating new category
                res = await createProductCategory(formData);
                console.log("🚀 ~ handleSubmit ~ res:", res);
                setCategories([...categories, res.data]);
                toast.dismiss();
                toast.success(
                    `Category created successfully: ${res.data.name}`,
                    {
                        position: "bottom-right",
                    }
                );
            }
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            toast.dismiss();
            if (
                error.response && // Check if response exists
                error.response.status === 422 && // Check if response status is 422
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
            setIsOpen(false);
        }
    };

    return (
        <>
            <table className="max-w-[974px] w-full text-sm text-left text-gray-500">
                <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
                    <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
                        <div className="">
                            Products Category
                            <p className="mt-1 text-sm font-normal text-pretty text-gray-500 ">
                                Berisi List-list product category yang
                                ditunjukkan di dalam company profile, anda dapat
                                menambah, merubah dan menghapus product yang
                                akan ditampilkan
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-3 justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-5">
                        <div className="w-full md:w-[30%]">
                            <form className="flex items-center ">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                        placeholder="Search"
                                        required=""
                                        defaultValue={search}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 space-x-4">
                            <button
                                className="bg-green-500 hover:bg-green-400 inline-flex items-center  text-white p-2.5 rounded-lg w-full"
                                onClick={() => handleEdit()}
                            >
                                <svg
                                    className="left-0 w-5 h-5 mx-2"
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
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <span className="text-sm">
                                    Add New Product Category
                                </span>
                            </button>
                        </div>
                    </div>
                </caption>
                <thead className="bg-white bg-opacity-45 text-xs border-b text-gray-700 uppercase ">
                    <tr>
                        <th scope="col" className="px-10 py-3">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category Product
                        </th>
                        <th scope="col" className="px-12 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category, index) => (
                        <tr
                            className="border-b hover:bg-white hover:bg-opacity-70"
                            key={category.id}
                        >
                            <th
                                scope="row"
                                className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">{category.name}</td>
                            <td className="px-1 py-3 text-right">
                                <div className="flex flex-row gap-3 justify-center items-center">
                                    <button
                                        className="grid grid-flow-row text-gray-600"
                                        onClick={() => handleEdit(category.id)}
                                    >
                                        <svg
                                            className="w-6 h-6 "
                                            data-slot="icon"
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
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            ></path>
                                        </svg>
                                        <span className="inline-flex text-xs">
                                            Edit{" "}
                                        </span>
                                    </button>
                                    <button
                                        className="grid grid-flow-row text-gray-600"
                                        onClick={() =>
                                            handleDeleteTask(category.id)
                                        }
                                    >
                                        <svg
                                            className="w-6 h-6 ml-2"
                                            data-slot="icon"
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
                                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                            ></path>
                                        </svg>
                                        <span className="inline-flex text-xs">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Pagination
                    currentPages={currentPages}
                    totalPages={totalPages}
                    setCurrentPages={setCurrentPages}
                />
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={categoryId ? "Edit Category" : "Create Category"}
            >
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter category name"
                            onChange={(e) => setShowCategory(e.target.value)}
                            value={showCategory}
                            required
                        />
                    </div>
                    <div className="flex">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {categoryId ? "Edit" : "Create"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Page;
