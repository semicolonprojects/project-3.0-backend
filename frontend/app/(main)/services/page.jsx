"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { getServices } from "../../api/v2/service/getService";
import { getServiceByCategory } from "../../api/v2/service/getServiceByCategory";
import Image from "next/image";
import Before from "/public/image/before.png";
import After from "/public/image/after.png";
import Link from "next/link";

const Page = () => {
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getClickCategory, setGetClickCategory] = useState("");
    const [imageRevealFraq, setImageRevealFraq] = useState(0);
    const imageContainer = useRef(null);

    const slide = (xPosition) => {
        const containerBoundingRect =
            imageContainer.current?.getBoundingClientRect();

        if (containerBoundingRect) {
            setImageRevealFraq(() => {
                if (xPosition < containerBoundingRect.left) {
                    return 0;
                } else if (xPosition > containerBoundingRect.right) {
                    return 1;
                } else {
                    return (
                        (xPosition - containerBoundingRect.left) /
                        containerBoundingRect.width
                    );
                }
            });
        }
    };

    const handleTouchMove = (event) => {
        slide(event.touches.item(0).clientX);
    };

    const handleMouseDown = () => {
        window.onmousemove = handleMouseMove;
        window.onmouseup = handleMouseUp;
    };

    const handleMouseMove = (event) => {
        slide(event.clientX);
    };

    const handleMouseUp = () => {
        window.onmousemove = null;
        window.onmouseup = null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (getClickCategory) {
                    const filteredRes = await getServiceByCategory(
                        getClickCategory
                    );
                    setFilteredServices(filteredRes);
                } else {
                    const filteredRes = await getServiceByCategory("all");
                    setFilteredServices(filteredRes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getClickCategory]);

    const handleClick = async (event) => {
        const clickedValue = event.target.value;
        setGetClickCategory(clickedValue);
    };

    return (
        <>
            <div className="relative overflow-hidden px-5 py-16 laptop:px-44 laptop:py-16 laptop:pt-3 desktop-lg:pb-80">
                <h1 className="pt-20 laptop:pt-10 tablet:pt-9 font-bold tracking-wide laptop:tracking-tight leading-none text-4xl laptop:text-[70px] text-[#FFB62B]">
                    Services For You
                </h1>
                <ul className="pt-5 pl-1 inline-flex font-medium text-[12px] laptop:text-sm gap-4 tablet:gap-7">
                    <li>
                        <button
                            value={""}
                            onClick={handleClick}
                            className={`hover:underline ${
                                getClickCategory === "" ? "text-yellow-500" : ""
                            } `}
                        >
                            All Services
                        </button>
                    </li>
                    <li>
                        <button
                            value="Shoes & Sandals"
                            onClick={handleClick}
                            className={`hover:underline ${
                                getClickCategory === "Shoes & Sandals"
                                    ? "text-yellow-500 "
                                    : ""
                            } `}
                        >
                            Shoes & Sandals
                        </button>
                    </li>
                    <li>
                        <button
                            value={"Bag"}
                            onClick={handleClick}
                            className={`hover:underline ${
                                getClickCategory === "Bag"
                                    ? "text-yellow-500"
                                    : ""
                            } `}
                        >
                            Bag
                        </button>
                    </li>
                    <li>
                        <button
                            value={"Hat"}
                            onClick={handleClick}
                            className={`hover:underline ${
                                getClickCategory === "Hat"
                                    ? "text-yellow-500"
                                    : ""
                            } `}
                        >
                            Hat
                        </button>
                    </li>
                    <li>
                        <button
                            value={"Others"}
                            onClick={handleClick}
                            className={`hover:underline ${
                                getClickCategory === "Others"
                                    ? "text-yellow-500"
                                    : ""
                            } `}
                        >
                            Others
                        </button>
                    </li>
                </ul>
                <div className="py-5 laptop:py-5 ">
                <div className="pb-5">
                        <div
                            ref={imageContainer}
                            className="max-w-lg w-full tablet:max-w-5xl  tablet:w-full desktop-md:max-w-[1100px] desktop-lg:max-w-[1460px] desktop-lg:w-full h-3/4 mx-auto tablet:ml-5 relative select-none"
                        >
                            <Image
                                src={Before}
                                className="h-[220px] tablet:h-[520px] desktop-lg:h-full w-full pointer-events-none"
                                alt="..."
                                loading="lazy"
                                unoptimized
                            />
                            <Image
                                src={After}
                                style={{
                                    clipPath: `polygon(0 0, ${
                                        imageRevealFraq * 100
                                    }% 0, ${
                                        imageRevealFraq * 100
                                    }% 100%, 0 100%)`,
                                }}
                                className="h-[220px] tablet:h-[520px] desktop-lg:h-full w-full absolute inset-0  pointer-events-none"
                                alt="..."
                                loading="lazy"
                                unoptimized
                            />

                            <div
                                style={{ left: `${imageRevealFraq * 100}%` }}
                                className="absolute inset-y-0"
                            >
                                <div className="relative h-full">
                                    <div className="absolute inset-y-0 bg-white w-0.5 -ml-px opacity-50"></div>
                                    <div
                                        style={{ touchAction: "none" }}
                                        onMouseDown={handleMouseDown}
                                        onTouchMove={handleTouchMove}
                                        className="h-10 w-10 -ml-5 -mt-5 rounded-full absolute top-1/2 shadow-2xl bg-white flex items-center justify-center cursor-pointer"
                                    >
                                        <svg
                                            data-slot="icon"
                                            fill="none"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="w-8 text-gray-500 rotate-90 transform"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-1 grid grid-cols-2 gap-x-[3.35rem] gap-y-7 laptop:gap-x-20 laptop:grid-cols-4 desktop-sm:gap-x-5 desktop-sm:grid-cols-4 desktop-lg:gap-x-1 desktop-lg:grid-cols-4 tablet:justify-start tablet:items-start">
                        {loading ? (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-[250px] h-[389px] bg-gray-300 animate-pulse"
                                    ></div>
                                ))}
                            </>
                        ) : filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <Link
                                    href={`services/${service.slug}`}
                                    className="group"
                                    key={service.id}
                                >
                                    <div className="aspect-h-1 aspect-w-1 w-[167px] h-[236px] laptop:w-[250px] laptop:h-[389px] desktop-lg:w-[329px] desktop-lg:h-[400px] overflow-hidden bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${service.category_image}`}
                                            alt="Service Image"
                                            width="200"
                                            height="389"
                                            className="h-full w-full object-cover group-hover:opacity-75"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="mt-2 text-[13px] laptop:text-sm capitalize text-gray-900 font-semibold">
                                        {service.nama_service}
                                    </h3>
                                    <h3 className="text-[13px] laptop:text-sm text-gray-900">
                                        {service.category}
                                    </h3>
                                </Link>
                            ))
                        ) : (
                            <p>Coming soon!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
