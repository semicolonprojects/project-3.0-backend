"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getServicesAll } from "../../../api/v2/service/getService";
import { DetailDesktop } from "./DetailDesktop";
import { DetailMobile } from "./DetailMobile";
import axios from "axios";

const Page = ({ params }) => {
    const [service, setService] = useState("");
    const [servicesDetail, setServicesDetail] = useState([]);
    const [serviceCarousel, setServiceCarousel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [radioValue, setRadioValue] = useState("");
    const [dataService, setDataService] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getSlug/${params.slug}`
                );

                if (data) {
                    setService(data);
                    const { data: dataDetail } = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getByCategoryId/${data.id}`
                    );
                    setServicesDetail(dataDetail);
                }

                const dataCarousel = await getServicesAll();
                setServiceCarousel(dataCarousel);
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchService();
        fetchData(null);
    }, [params.slug]);

    const onOptionChange = async (event) => {
        const selectedValue = event.target.value;
        setRadioValue(selectedValue);
        await fetchData(selectedValue);
    };

    const fetchData = async (selectedValue) => {
        try {
            const url = selectedValue
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getById/${selectedValue}`
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getById`;

            const { data } = await axios.get(url);
            setDataService(data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div className="w-full h">Loading...</div>;
        }
        if (!service) {
            return <div>No Data</div>;
        }

        if (dataService) {
            return (
                <>
                    <DetailDesktop dataService={dataService} />
                    <DetailMobile dataService={dataService} />
                </>
            );
        }
    };

    return (
        <>
            {/* Desktop */}
            <div className="hidden tablet:block relative mx-16 desktop-lg:mx-44 py-5 desktop-lg:pb-80">
                <div className="grid grid-cols-2 gap-10">
                    <div className="max-w-xl w-full desktop-md:max-w-[660px] h-fit ">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${service.image}`}
                            alt="..."
                            className="h-[600px] desktop-sm:h-[650px] w-full"
                        />
                    </div>

                    <div className="relative mx-1 my-10">
                        <nav className="relative " aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a
                                        href="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4EAEFD] "
                                    >
                                        <svg
                                            className="w-3 h-3 me-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <Link
                                            href="/services"
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-[#4EAEFD] md:ms-2 "
                                        >
                                            Services
                                        </Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm capitalize font-medium text-[#4EAEFD] md:ms-2">
                                            {service.name} -{" "}
                                            {service.category_barang}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {renderContent()}

                        {/* Carousel */}
                        <div className="relative pt-10">
                            <h2 className="font-bold text-4xl">
                                Service Kami Lainnya{" "}
                            </h2>
                            <div className="py-5 pr-40 grid grid-rows-1-1 gap-0 desktop-sm:gap-10 sm:grid-rows-2 lg:grid-rows-3 justify-between ">
                                {loading ? (
                                    <>
                                        {[...Array(8)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="w-auto h-auto bg-gray-300 animate-pulse"
                                            ></div>
                                        ))}
                                    </>
                                ) : servicesDetail.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {servicesDetail.map(
                                            (serviceDetail, index) => (
                                                <div
                                                    className="flex items-center"
                                                    key={index}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={serviceDetail.id}
                                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        onChange={
                                                            onOptionChange
                                                        }
                                                        name="radio"
                                                    />
                                                    <label className="ml-3 w-full text-lg font-semibold whitespace-nowrap">
                                                        {
                                                            serviceDetail.nama_service
                                                        }
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p>Coming soon!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="block tablet:hidden relative mx-5 pt-28">
                <div className="grid grid-cols-1">
                    <div className="max-w-2xl w-full h-full ">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${service.image}`}
                            alt="..."
                            className="h-[390px] w-full"
                        />
                    </div>
                    <div className="relative mx-1 my-10">
                        <nav className="relative py-2" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4EAEFD] "
                                    >
                                        <svg
                                            className="w-3 h-3 me-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <Link
                                            href="/services"
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-[#4EAEFD] md:ms-2 "
                                        >
                                            Services
                                        </Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm capitalize font-medium text-[#4EAEFD] md:ms-2">
                                            {service.name} -{" "}
                                            {service.category_barang}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {renderContent()}

                        {/* Carousel */}

                        <div className=" w-full">
                            <h2 className="font-bold text-2xl tracking-tighter flex py-7 pb-2">
                                Service Kami Lainnya{" "}
                            </h2>
                            <div className="grid grid-cols-2 gap-5">
                                {loading ? (
                                    <>
                                        {[...Array(8)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="w-auto h-auto bg-gray-300 animate-pulse"
                                            ></div>
                                        ))}
                                    </>
                                ) : servicesDetail.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {servicesDetail.map(
                                            (serviceDetail, index) => (
                                                <div
                                                    className="flex items-center"
                                                    key={index}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={serviceDetail.id}
                                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        onChange={
                                                            onOptionChange
                                                        }
                                                        name="radio"
                                                    />
                                                    <label className="ml-3 w-full text-lg font-semibold whitespace-nowrap">
                                                        {
                                                            serviceDetail.nama_service
                                                        }
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p>Coming soon!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
