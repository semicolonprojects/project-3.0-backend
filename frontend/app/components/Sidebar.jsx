"use client";

import Image from "next/image";
import Logo from "/public/image/logo.png";
import WhatsApp from "/public/image/whatsapp.svg";
import Instagram from "/public/image/instagram.svg";
import Tiktok from "/public/image/tiktok.svg";
import Youtube from "/public/image/youtube.svg";
import ModalSocials from "../components/Modal/ModalSocials";
import { useEffect, useState } from "react";
import Link from "next/link";
import { detectDevice } from "../utils/deviceUtils";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Sidebar = () => {
    const [isExpand, setisExpand] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [showModal, setshowModal] = useState(false);

    const handleClick = () => {
        setisExpand(!isExpand);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (isExpand) {
                setisExpand(false);
            }
        };

        if (isExpand) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isExpand]);

    const handleResize = () => {
        const { deviceWidth } = detectDevice();

        // Update the state based on the device width
        setIsSidebarHidden(deviceWidth < 600);
    };

    useEffect(() => {
        // Call the handleResize function when the component mounts
        handleResize();

        // Add event listener to detect changes in screen size
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {isSidebarHidden ? null : (
                <div className="">
                    <aside
                        className={`hidden tablet:fixed md:flex flex-col bg-[#D9D9D9] text-zinc-50 fixed md:translate-x-0 z-20  ${
                            isExpand ? "w-[38%] " : "w-16"
                        }  laptop-lg:h-screen transition-all duration-300 ease-out`}
                    >
                        <div
                            className={`flex flex-row justify-between ${
                                isExpand ? "p-4" : ""
                            } `}
                        >
                            <div className="py-6 px-[23px] ">
                                <button
                                    onClick={handleClick}
                                    className="flex flex-col justify-center items-center"
                                >
                                    <span
                                        className={`bg-[#4A89B0] block transition-all duration-300 ease-out
                    h-0.5 w-6 rounded-sm ${
                        isExpand
                            ? "rotate-45 translate-y-1"
                            : "-translate-y-0.5"
                    }`}
                                    ></span>
                                    <span
                                        className={`bg-[#4A89B0] block transition-all duration-300 ease-out
                    h-0.5 w-6 rounded-sm my-0.5 ${
                        isExpand ? "opacity-0" : "opacity-100"
                    }`}
                                    ></span>
                                    <span
                                        className={`bg-[#4A89B0] block transition-all duration-300 ease-out
                    h-0.5 w-6 rounded-sm ${
                        isExpand
                            ? "-rotate-45 -translate-y-1"
                            : "translate-y-0.5"
                    }`}
                                    ></span>
                                </button>
                            </div>
                            <Link
                                href="/cek-status"
                                style={
                                    !isExpand
                                        ? { display: "none" }
                                        : { display: "" }
                                }
                            >
                                <button className="w-24 mt-1.5 rounded-lg text-white text-center text-xs desktop-md:text-base font-semibold p-2.5 bg-[#4A89B0]">
                                    Cek Resi
                                </button>
                            </Link>
                        </div>
                        {isExpand && (
                            <>
                                <div className="px-[79px] py-10 pb-2">
                                    <Link href="/">
                                        <div className="grid grid-flow-row items-center">
                                            <Image
                                                src={Logo}
                                                height={60}
                                                width={60}
                                                alt="..."
                                                className="rotate-90 ml-6 desktop-lg:w-24 "
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className=" mt-0 grid grid-flow-row font-bold text-5xl desktop-sm:text-5xl desktop-lg:text-7xl desktop-lg:mt-24 px-20 text-[#4A89B0]  gap-y-11 desktop-sm:gap-y-11">
                                    <Link href="/services">
                                        <button className="text-left hover:text-[#FFB62B]">
                                            Our Services
                                        </button>
                                    </Link>
                                    <Link href="/products">
                                        <button className="text-left hover:text-[#FFB62B]">
                                            Our Products
                                        </button>
                                    </Link>
                                    <button
                                        className="text-left hover:text-[#FFB62B]"
                                        onClick={setshowModal}
                                    >
                                        Our Socials
                                    </button>
                                    <Link href="/partnership">
                                        <button className="text-left hover:text-[#FFB62B]">
                                            Our Programs
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )}
                        {!isExpand && (
                            <div className="flex flex-col justify-between h-full ">
                                <div className="grid grid-flow-row gap-6">
                                    <Link
                                        href="https://api.whatsapp.com/send?phone=6281232750957"
                                        title="WhatsApp"
                                        aria-label="Whatsapp"
                                        target="_blank"
                                        className="flex justify-center items-center pl-1"
                                    >
                                        <Image src={WhatsApp} alt="WhatsApp" />
                                    </Link>
                                    <Link
                                        href="/cek-status"
                                        title="Cek Status"
                                        aria-label="Cek Status"
                                        className="flex justify-center items-center pl-1"
                                    >
                                        <MagnifyingGlassIcon
                                            width={27}
                                            height={27}
                                            className="text-[#4A89B0]"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        className="flex justify-center items-center"
                                        href="/"
                                    >
                                        <Image
                                            src={Logo}
                                            height={53}
                                            width={53}
                                            alt="..."
                                        />
                                    </Link>
                                </div>
                                <div className="grid grid-flow-row gap-6 py-4">
                                    <Link
                                        href="https://www.instagram.com/nettoyer.shoes/"
                                        title="Instagram"
                                        aria-label="Instagram"
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <Image
                                            src={Instagram}
                                            alt="Instagram"
                                        />
                                    </Link>
                                    <Link
                                        href="https://www.tiktok.com/@nettoyer.shoes"
                                        title="TikTok"
                                        aria-label="TikTok"
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <Image src={Tiktok} alt="Tiktok" />
                                    </Link>
                                    <Link
                                        href="https://www.youtube.com/@Nettoyer.Shoes_IDN"
                                        title="YouTube"
                                        aria-label="YouTube"
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <Image src={Youtube} alt="Youtube" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            )}
            <ModalSocials showModal={showModal} setshowModal={setshowModal} />
        </>
    );
};

export default Sidebar;
