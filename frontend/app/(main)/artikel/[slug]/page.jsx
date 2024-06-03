"use client";

import { useEffect, useState } from "react";
import { showArtikel } from "../../../api/v2/artikel/showArtikel";
import parse from "html-react-parser";
import Link from "next/link";

const Page = ({ params }) => {
    const [getArtikel, setGetArtikel] = useState("");

    function join(date, options, separator) {
        function format(option) {
            let formatter = new Intl.DateTimeFormat("en", option);
            return formatter.format(date);
        }
        return options.map(format).join(separator);
    }

    function formatTanggal(created_at) {
        const options = [
            { day: "numeric" },
            { month: "long" },
            { year: "numeric" },
        ];
        const joined = join(new Date(), options, " ");

        return joined;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showArtikel(params.slug);
                setGetArtikel(data);
            } catch (error) {
                console.error("Error fetching artikel:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {/* Desktop View */}
            <div className="hidden tablet:block container">
                <div className="mx-32 mt-10">
                    <nav className="relative " aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-0.5 ">
                            <li className="inline-flex items-center">
                                <a
                                    href="/"
                                    className="inline-flex items-center text-md font-medium text-gray-700 hover:text-[#4EAEFD] "
                                >
                                    Home
                                </a>
                            </li>
                            <li></li>
                            <li aria-current="page">
                                <div className="inline-flex items-center">
                                    /
                                    <span className="text-md capitalize font-medium text-[#4EAEFD] ms-1">
                                        {getArtikel.category}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="text-center my-5 ">
                        <span className="capitalize">
                            {getArtikel.category}
                        </span>
                        <h1 className="text-[#FFB62B] font-semibold text-3xl md:text-5xl lg:text-6xl text-center my-5 mt-2">
                            {getArtikel.judul}
                        </h1>
                        <span className="capitalize mb-5">
                            {formatTanggal(getArtikel.created_at)}
                        </span>
                    </div>
                    <img
                        className="block mx-10 mb-8 max-w-7xl max-h-96 rounded-xl w-full"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${getArtikel.image}`}
                        alt={getArtikel.judul}
                    />
                    <div className="p-10 pt-2">
                        <p className="text-gray-700 text-lg leading-relaxed text-left ">
                            {parse(`${getArtikel.isi_artikel}`)}
                        </p>
                    </div>
                </div>
                <div></div>
            </div>

            {/* Mobile View */}
            <div className="block tablet:hidden container">
                <div className="mt-32">
                    <div className=" mx-5 ">
                        <span className="text-lg capitalize">
                            {getArtikel.category}
                        </span>
                        <h1 className="text-[#FFB62B] font-semibold text-[33px] my-2 mt-1">
                            {getArtikel.judul}
                        </h1>
                        <span className="text-lg capitalize mb-5">
                            {formatTanggal(getArtikel.created_at)}
                        </span>
                    </div>
                    <img
                        className="block ml-4 mb-8 max-w-2xl max-h-80 rounded-xl w-full"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${getArtikel.image}`}
                        alt={getArtikel.judul}
                    />
                    <div className="p-6 pt-2 pb-10">
                        <p className="break-words tracking-tighter text-lg ">
                            {parse(`${getArtikel.isi_artikel}`)}
                        </p>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    );
};

export default Page;
