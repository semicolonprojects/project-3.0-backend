"use client";

import { useEffect, useState } from "react";
import {
    createServiceCategory,
    getServicesCategory,
    deleteServiceCategory,
    detailServiceCategory,
    updateCategory,
} from "./_api/api";
import Pagination from "./components/Pagination.jsx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Category = () => {
    const [search, setSearch] = useState("");
    const [currentPages, setCurrentPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState([]);

    const router = useRouter();

    useEffect(
        () => {
            const fetchServiceCategory = async () => {
                try {
                    const categoriesData = await getServicesCategory(
                        currentPages
                    );
                    const res = categoriesData;
                    setCategories(res.data);
                    setTotalPages(res.meta.last_page);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchServiceCategory();
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

    const handelDeleteTask = async (serviceCategoryId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category ?"
        );
        if (!confirmDelete) return;

        try {
            await deleteServiceCategory(serviceCategoryId);
            setCategories(
                categories.filter(
                    (category) => category.id !== serviceCategoryId
                )
            );
            toast.success("Service's Category deleted successfully", {
                position: "bottom-right",
            });
            router.refresh();
        } catch (error) {
            console.error("Error deleting service's category:", error);
        }
    };

    return (
        <>
            <table className="max-w-[974px] w-full text-sm text-left text-gray-500">
                <caption className="text-lg font-semibold text-left  text-gray-900 bg-">
                    <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
                        <div className="">
                            Services's Category
                            <p className="mt-1 text-sm font-normal text-pretty text-gray-500 ">
                                Berisi List-list service yang ditunjukkan di
                                dalam company profile, anda dapat menambah,
                                merubah dan menghapus product yang akan
                                ditampilkan
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-3 justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-5">
                        <div className="w-full md:w-[30%]">
                            <form className="flex items-center ">
                                <label for="simple-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewbox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                        placeholder="Search"
                                        required=""
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 space-x-4">
                            <Link href={"/dashboard/services/category/create"}>
                                <button className="bg-green-500 hover:bg-green-400 inline-flex items-center  text-white p-2.5 rounded-lg w-full">
                                    <svg
                                        className="left-0 w-5 h-5 mx-2"
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
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>
                                    <span className="text-sm">
                                        Add New Service's Category{" "}
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </caption>
                <thead className="bg-white bg-opacity-45 text-xs border-b text-gray-700 uppercase ">
                    <tr>
                        <th scope="col" className="pl-9 py-3">
                            Nama Category Service
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Slug
                        </th>
                        <th scope="col" className="px-10 py-3">
                            Category
                        </th>
                        <th scope="col" className="pl-16 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr className="border-b hover:bg-white hover:bg-opacity-70">
                            <td
                              
                                className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                                {category.name}
                            </td>
                            <td className="px-2 py-4">{category.slug}</td>
                            <td className="px-6 py-4">
                                {category.category_barang}
                            </td>
                            <td className="px-2 py-3 text-right">
                                <div className="grid grid-flow-col gap-1">
                                    <Link
                                        href={`/dashboard/services/category/${category.id}/show`}
                                    >
                                        <button className="grid grid-flow-row text-gray-600">
                                            <svg
                                                className="w-6 h-6 ml-2"
                                                data-slot="icon"
                                                fill="none"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                ></path>
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                ></path>
                                            </svg>
                                            <span className="inline-flex text-xs">
                                                Preview{" "}
                                            </span>
                                        </button>
                                    </Link>
                                    <Link href={`/dashboard/services/category/${category.id}/edit`}>
                                    <button
                                        className="grid grid-flow-row text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6 "
                                            data-slot="icon"
                                            fill="none"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            ></path>
                                        </svg>
                                        <span className="inline-flex text-xs">
                                            Edit{" "}
                                        </span>
                                    </button>
                                    </Link>
                                    <button
                                        className="grid grid-flow-row text-gray-600"
                                        onClick={() =>
                                            handelDeleteTask(category.id)
                                        }
                                    >
                                        <svg
                                            className="w-6 h-6 ml-2"
                                            data-slot="icon"
                                            fill="none"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
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
        </>
    );
};

export default Category;
