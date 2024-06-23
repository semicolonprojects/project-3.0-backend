"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../app/swiperStyle.css";
import { getArtikel } from "../api/v2/artikel/getArtikel";
import { getArtikelCategory } from "../api/v2/artikel-category/getArtikelCategory";
import { useEffect, useState } from "react";
import Link from "next/link";
import { detectDevice } from "../utils/deviceUtils";

const ImageCarousel = () => {
    const [artikelData, setArtikelData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mobileArtikel, setmobileArtikel] = useState(false);

    const handleResize = () => {
        const { deviceWidth } = detectDevice();
        console.log(deviceWidth);
        // Update the state based on the device width
        setmobileArtikel(deviceWidth < 400);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArtikel();
                setArtikelData(data);

                const grouped = data.reduce((acc, curr, index) => {
                    const groupIndex = Math.floor(
                        `${mobileArtikel ? index / 1 : index / 3}`
                    );
                    if (!acc[groupIndex]) {
                        acc[groupIndex] = [];
                    }
                    acc[groupIndex].push(curr);

                    return acc;
                }, []);

                setGroupedData(grouped);
            } catch (error) {
                console.error("Error fetching artikel:", error);
            }
        };

        handleResize();
        fetchData();

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileArtikel]);

    return (
        <>
            <Swiper
                navigation
                pagination={{
                    type: "bullets",
                    clickable: true,
                }}
                modules={[Pagination]}
                onSwiper={(swiper) => console.log(swiper)}
                className="w-full flex justify-center items-center "
            >
                {groupedData.map((groupData, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-1 laptop:grid-cols-3 laptop-lg:grid-cols-3 ">
                            {groupData.map((item, itemIndex) => (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                    <Link
                                        href={`/artikel/${item.slug}`}
                                        className="w-96"
                                        key={itemIndex}
                                    >
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${item.image}`}
                                            alt={`${item.judul}`}
                                            className="w-96 h-80 rounded-t-lg"
                                            unoptimized
                                        />
                                    </Link>
                                    <div className="p-5">
                                        <div className="px-2 py-4">
                                            <Link
                                                href={`/artikel/${item.slug}`}
                                                className="w-96"
                                                key={itemIndex}
                                            >
                                                <div className="mb-2 text-2xl font-bold tracking-tight text-wrap break-words text-gray-900">
                                                    {item.judul}
                                                </div>
                                            </Link>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                {item.description ?? "-"}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 ml-1 mb-2 cursor-pointer ${
                                                selectedCategory ===
                                                item.category
                                                    ? "bg-blue-500 text-amber-400"
                                                    : ""
                                            }`}
                                        >
                                            #{item.category}
                                        </span>
                                        <Link
                                            href={`/artikel/${item.slug}`}
                                            className="mt-4 block items-center px-3 py-2 w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                            key={itemIndex}
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ImageCarousel;
