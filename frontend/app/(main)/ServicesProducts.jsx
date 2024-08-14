"use client";

import TravelKit from "../../public/image/travel_kit.png";
import Services from "../../public/image/services(sepatu&sikat).jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { detectDevice } from "../utils/deviceUtils";
import Link from "next/link";

const ServicesProducts = () => {
    const [mobilePlayer, setmobilePlayer] = useState(false);

    const handleResize = () => {
        const { deviceWidth } = detectDevice();

        setmobilePlayer(deviceWidth < 500);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative pt-12 pb-5 mx-3 phone:w-80 phone:mx-4 phone2:mx-8 laptop:mx-44 laptop:ml-32 laptop-lg:mx-28 laptop-lg:w-[85.9%] desktop-sm:mx-32 desktop-lg:mx-48 w-full">
            <p className="text-[#FFB62B] py-2 font-bold text-2xl md:text-4xl lg:text-4xl xl:text-5xl desktop-lg:text-6xl">
                Our Services & Products
            </p>
            <div className="grid grid-cols-1  gap-2 grid-flow-col laptop-lg:gap-x-10  desktop-lg:gap-x-6 ">
                <div className="hidden tablet:block laptop:w-[525px] laptop-lg:w-[825px] desktop-sm:w-[840px] desktop-sm:h-[700px]  desktop-lg:w-[970px] desktop-lg:h-[900px] h-auto rounded overflow-hidden">
                    {mobilePlayer ? (
                        <div></div>
                    ) : (
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/7P_raenzq60?vq=hd1080&modestbranding=1&rel=0&fs=0&color=white&controls=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                            className="w-full h-full"
                        />
                    )}
                </div>
                <div className="grid grid-flow-row  gap-9 laptop:gap-10 laptop-lg:gap-5 laptop:mx-44 laptop-lg:mx-0 desktop-lg:mx-44">
                    <div className="relative w-[340px] laptop:w-[270px] laptop-lg:w-[300px] laptop-lg:h-[300px] desktop-sm:w-[345px] desktop-sm:h-[338px] desktop-lg:w-[435px] desktop-lg:h-[440px]  h-full rounded overflow-hidden shadow-lg">
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <Image
                            src={TravelKit}
                            alt="..."
                            className="w-full h-full bg-fill"
                            unoptimized
                        />
                        <Link href="/products">
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end font-bold text-white p-4 [writing-mode:vertical-rl] rotate-180">
                                <p className="text-center text-[40px]">
                                    PRODUCTS
                                </p>
                            </div>
                        </Link>
                    </div>
                    <Link href="/services">
                        <div className="rounded overflow-hidden w-fit shadow-lg">
                            <div className="relative w-[340px] laptop:w-[270px] laptop-lg:w-[300px] laptop-lg:h-[300px] desktop-sm:w-[345px] desktop-sm:h-[338px]  desktop-lg:w-[435px] desktop-lg:h-[440px] h-full  rounded overflow-hidden">
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                                <Image
                                    src={Services}
                                    alt="..."
                                    className="w-full h-full object-fill"
                                    unoptimized
                                />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-end font-bold text-white p-4 [writing-mode:vertical-rl] rotate-180">
                                    <p className="text-center text-[40px]">
                                        SERVICES
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesProducts;
