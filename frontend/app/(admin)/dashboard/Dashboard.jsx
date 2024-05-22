"use client";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import logo from "/public/img/logo3.png";
import Link from "next/link";
import { toast } from "react-hot-toast";

function Dashboard() {
    const [showMenu, setshowMenu] = useState(false);
    const cookies = useCookies();

    const router = useRouter();

    const token = cookies.get("token");

    const logout = async (e) => {
        e.preventDefault();
        toast.loading("Loading ...", {
            position: "bottom-right",
        });
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`,
            data: {
                token: token,
            },
        })
            .then((response) => {
                cookies.remove("token");
                toast.dismiss();
                router.push("/login");
            })
            .catch((error) => {
                toast.apply(error);
            });
    };

    const toggleMenu = () => {
        setshowMenu((showMenu) => !showMenu);
    };
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-[#4EAEFD] rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link
                                href="/dashboard"
                                className="flex ms-2 md:me-24"
                            >
                                <Image
                                    className="w-16 h-10 mr-2.5"
                                    src={logo}
                                />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                                    Nettoyer
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        onClick={toggleMenu}
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                                    >
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                {showMenu && (
                                    <div className="absolute top-12 right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-4 py-3" role="none">
                                            <p
                                                className="text-sm text-gray-900 "
                                                role="none"
                                            >
                                                Neil Sims
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate "
                                                role="none"
                                            >
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                    role="menuitem"
                                                >
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                    role="menuitem"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                    role="menuitem"
                                                >
                                                    Earnings
                                                </a>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={logout}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-[#3f8ac7] transition duration-75  group-hover:text-[#4EAEFD] "
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
                                    <rect
                                        width="7"
                                        height="18"
                                        x="3"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="14"
                                        rx="1"
                                    />
                                </svg>
                                <span className="ms-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/products"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-[#3f8ac7] transition duration-75  group-hover:text-[#4EAEFD] "
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
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Products
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/services"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-[#3f8ac7] transition duration-75  group-hover:text-[#4EAEFD] "
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
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Services
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/resi"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-[#3f8ac7] transition duration-75  group-hover:text-[#4EAEFD]"
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
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Resi
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/artikel"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-[#3f8ac7] transition duration-75  group-hover:text-[#4EAEFD] "
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
                                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    <path d="M18 14h-8" />
                                    <path d="M15 18h-5" />
                                    <path d="M10 6h8v4h-8V6Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Artikel
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Dashboard;
