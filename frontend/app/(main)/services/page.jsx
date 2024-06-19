"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getServices } from "../../api/v2/service/getService";
import { getServiceByCategory } from "../../api/v2/service/getServiceByCategory";
import Link from "next/link";

const Page = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [category, setCategory] = useState("");
    const [getClickCategory, setGetClickCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (getClickCategory) {
                    // Fetch filtered data if category is set
                    const filteredRes = await getServiceByCategory(
                        getClickCategory
                    );
                    console.log("🚀 ~ fetchData ~ filteredRes:", filteredRes);
                    setFilteredServices(filteredRes);
                } else {
                    // const res = await getServices();
                    // setServices(res);
                    const filteredRes = await getServiceByCategory("all");
                    setFilteredServices(filteredRes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [category, getClickCategory]);

    const handleClick = async (event) => {
        const clickedValue = event.target.value;
        setGetClickCategory(clickedValue);
    };

    return (
        <>
            <div className="relative overflow-hidden px-5 py-16 laptop:px-44 laptop:py-16 laptop:pt-3">
                <h1 className="pt-20 laptop:pt-5 tablet:pt-9 font-bold tracking-wide laptop:tracking-tight leading-none text-4xl laptop:text-[70px] text-[#FFB62B]">
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
                            value={"Shoes & Sandals"}
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
                    <div className="py-1 grid grid-cols-2 gap-x-3 gap-y-7 laptop:gap-x-20 laptop:grid-cols-4  tablet:justify-start tablet:items-start">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <Link
                                    href={`services/${service.slug}`}
                                    className="group"
                                    key={service.id}
                                >
                                    <div className="aspect-h-1 aspect-w-1 w-[157px] h-[236px] laptop:w-[250px] laptop:h-[389px] overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${service.category_image}`}
                                            alt="..."
                                            width="200"
                                            height="389"
                                            className="h-full w-full object-cover  group-hover:opacity-75"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="mt-2 text-[13px] laptop:text-sm text-gray-900 font-semibold">
                                        {service.nama_service}
                                    </h3>
                                    <h3 className=" text-[13px] laptop:text-sm text-gray-900 ">
                                        {service.category}
                                    </h3>
                                </Link>
                            ))
                        ) : (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-[250px] h-[389px] bg-gray-300 animate-pulse"
                                    ></div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
