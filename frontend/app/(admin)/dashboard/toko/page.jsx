"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
    const [toko, setToko] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/toko`);
                setToko(data.data);
                setTotalPages(data.last_page);
            } catch (error) {
                toast.error(error.message || "Error", {
                    position: "bottom-right",
                });
            }
        };

        fetchServices();
    }, [currentPage]);

    const filteredToko = useMemo(() => {
        const searchLower = debouncedSearch.toLowerCase();
        return toko.filter(
            (toko_data) =>
                toko_data.nama_toko.toLowerCase().includes(searchLower) || toko_data.alamat_toko.toLowerCase().includes(searchLower)
        );
    }, [toko, debouncedSearch]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleDeleteToko = async (id) => {
        if (!window.confirm("Hapus Toko ?")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/toko/${id}`);
            setToko((prevToko) =>
                prevToko.filter((toko_data) => toko_data.id !== id)
            );
            toast.success("Service berhasil dihapus", {
                position: "bottom-right",
            });
        } catch (error) {
            toast.error(error.message || "Gagal menghapus service", {
                position: "bottom-right",
            });
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="p-4 ml-80">
                <div className="py-20 pb-10">
                    <div className="grid grid-flow-col gap-6 w-fit">
                        <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                            <svg
                                className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7] "
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
                                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                                ></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold py-5">
                            Toko Content Management
                        </h1>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px]">
                    <table className="max-w-[974px] w-full text-sm text-left text-gray-500">
                        <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
                            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
                                <div className="">
                                    Toko
                                    <p className="mt-1 text-sm font-normal text-pretty text-gray-500 ">
                                        Berisi List-list toko yang
                                        ditunjukkan di dalam company profile,
                                        anda dapat menambah, merubah dan
                                        menghapus toko yang akan ditampilkan
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
                                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                                placeholder="Search"
                                                value={search || ""}
                                                onChange={handleSearchChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 space-x-4">
                                    <Link href="/dashboard/toko/create">
                                        <button className="bg-green-500 hover:bg-green-400 inline-flex items-center  text-white p-2.5 rounded-lg w-full">
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
                                                Add New Toko{" "}
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </caption>
                        <thead className="bg-white bg-opacity-45 text-xs border-b text-gray-700 uppercase ">
                            <tr>
                                <th scope="col" className="px-10 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-10 py-3">
                                    Nama Toko
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Alamat Toko
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredToko.map((toko_data, index) => (
                                <tr
                                    className="border-b hover:bg-white hover:bg-opacity-70"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {index + 1}.
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {toko_data.nama_toko}
                                    </th>
                                    <td className="px-6 py-4">
                                        {toko_data.alamat_toko}
                                    </td>
                                    <td className="px-1 py-3 text-right">
                                        <div className="grid grid-flow-col gap-1">
                                            <Link
                                                href={`./toko/${toko_data.id}`}
                                            >
                                                <button className="grid grid-flow-row text-gray-600">
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
                                            </Link>
                                            <button
                                                className="grid grid-flow-row text-gray-600"
                                                onClick={() =>
                                                    handleDeleteToko(
                                                        toko_data.id
                                                    )
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
                    <div className="flex justify-center items-center py-2">
                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                                value={page}
                                className={`inline-block text-gray-800 font-semibold py-2 px-4 ${currentPage === page
                                    ? "pointer-events-none" && "underline"
                                    : ""
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end items-end p-6">
                        Page {currentPage} from {totalPages}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
