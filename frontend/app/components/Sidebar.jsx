"use client";

import Image from "next/image";
import Logo from "/public/image/logo.png";
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
            <div
                id="wrapper"
                className={`fixed inset-0  ${
                    isExpand
                        ? "bg-opacity-25 backdrop-brightness-50 overflow-auto"
                        : "bg-opacity-100 backdrop-blur-none"
                } flex z-20`}
            >
                    <aside
                        className={`hidden tablet:fixed md:flex flex-col bg-[#D9D9D9] text-zinc-50 fixed md:translate-x-0 z-20  ${
                            isExpand ? "w-[38%] " : "w-16"
                        }  laptop-lg:h-screen transition-all duration-300 ease-out`}
                    >
                        <div className="py-8 px-[23px] ">
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
                        {isExpand && (
                            <>
                                <div className="absolute px-[400px] desktop-sm:px-[435px] desktop-md:px-[615px] py-3 desktop-md:py-2">
                                    <Link href="/cek-status">
                                        <button className="w-24 mt-1.5 rounded-lg text-white text-center text-xs desktop-md:text-base font-semibold p-2.5 bg-[#4A89B0]">
                                            Cek Resi
                                        </button>
                                    </Link>
                                </div>
                                <div className="px-[79px] py-10 pb-2">
                                    <Link href="/">
                                        <div className="grid grid-flow-row items-center">
                                            <Image
                                                src={Logo}
                                                height={60}
                                                width={60}
                                                alt="..."
                                                className="rotate-90 ml-6 desktop-md:w-24 "
                                                unoptimized
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className=" mt-10 grid grid-flow-row font-bold text-5xl desktop-sm:text-5xl desktop-md:text-7xl desktop-md:mt-24 px-20 text-[#4A89B0]  gap-y-11 desktop-sm:gap-y-20">
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
                        <div className="grid grid-flow-row justify-center gap-8">
                            {!isExpand && (
                                <>
                                    <div className="items-center">
                                        <Link
                                            href="https://api.whatsapp.com/send?phone=6281232750957"
                                            title="WhatsApp"
                                            aria-label="Whatsapp"
                                            target="_blank"
                                        >
                                            <svg
                                                width="27"
                                                height="27"
                                                viewBox="0 0 24 24"
                                                alt="Whatsapp"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.88595 7.16985C9.06891 7.17475 9.27175 7.18465 9.46474 7.61303C9.59271 7.89821 9.80829 8.42321 9.9839 8.85087C10.1206 9.18366 10.233 9.45751 10.2611 9.51356C10.3254 9.64156 10.365 9.78926 10.2809 9.96156C10.271 9.98188 10.2617 10.0013 10.2526 10.02C10.1852 10.16 10.1372 10.2597 10.0237 10.3899C9.97709 10.4435 9.9285 10.5022 9.88008 10.5607C9.79494 10.6636 9.71035 10.7658 9.63785 10.838C9.50924 10.9659 9.37563 11.1039 9.52402 11.3599C9.6725 11.6159 10.1919 12.4579 10.9587 13.1373C11.783 13.8712 12.4998 14.1805 12.8622 14.3368C12.9325 14.3672 12.9895 14.3918 13.0313 14.4126C13.2886 14.5406 13.4419 14.5209 13.5903 14.3486C13.7388 14.1762 14.2334 13.6001 14.4066 13.3441C14.5748 13.0881 14.7479 13.1275 14.9854 13.2161C15.2228 13.3047 16.4892 13.9251 16.7464 14.0531C16.7972 14.0784 16.8448 14.1012 16.8889 14.1224C17.0678 14.2082 17.1895 14.2665 17.2411 14.3535C17.3054 14.4618 17.3054 14.9739 17.0927 15.5746C16.8751 16.1752 15.8263 16.7513 15.3514 16.7956C15.3064 16.7999 15.2617 16.8053 15.2156 16.8108C14.7804 16.8635 14.228 16.9303 12.2596 16.1555C9.83424 15.2018 8.23322 12.8354 7.90953 12.357C7.88398 12.3192 7.86638 12.2932 7.85698 12.2806L7.8515 12.2733C7.70423 12.0762 6.80328 10.8707 6.80328 9.62685C6.80328 8.43682 7.38951 7.81726 7.65689 7.53467C7.67384 7.51676 7.6895 7.50021 7.70366 7.48494C7.94107 7.22895 8.21814 7.16495 8.39125 7.16495C8.56445 7.16495 8.73756 7.16495 8.88595 7.16985Z"
                                                    fill="#4A89B0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M2.18418 21.3314C2.10236 21.6284 2.37285 21.9025 2.6709 21.8247L7.27824 20.6213C8.7326 21.409 10.37 21.8275 12.0371 21.8275H12.0421C17.5281 21.8275 22 17.3815 22 11.9163C22 9.26735 20.966 6.77594 19.0863 4.90491C17.2065 3.03397 14.7084 2 12.042 2C6.55607 2 2.08411 6.44605 2.08411 11.9114C2.08348 13.65 2.5424 15.3582 3.41479 16.8645L2.18418 21.3314ZM4.86092 17.2629C4.96774 16.8752 4.91437 16.4608 4.71281 16.1127C3.97266 14.8348 3.58358 13.3855 3.58411 11.9114C3.58411 7.28158 7.37738 3.5 12.042 3.5C14.3119 3.5 16.4296 4.37698 18.0281 5.96805C19.6248 7.55737 20.5 9.66611 20.5 11.9163C20.5 16.5459 16.7068 20.3275 12.0421 20.3275H12.0371C10.6206 20.3275 9.22863 19.9718 7.99266 19.3023C7.65814 19.1211 7.26726 19.0738 6.89916 19.17L4.13676 19.8915L4.86092 17.2629Z"
                                                    fill="#4A89B0"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="/cek-status"
                                            title="Cek Status"
                                            aria-label="Cek Status"
                                        >
                                            <MagnifyingGlassIcon
                                                width={27}
                                                height={27}
                                                className="text-[#4A89B0]"
                                            />
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        {!isExpand && (
                            <>
                                <div className="flex flex-col items-center pt-64 laptop:pt-28 laptop-lg:pt-36 desktop-sm:pt-52 desktop-md:pt-[335px]">
                                    <Link href="/">
                                        <Image
                                            src={Logo}
                                            height={53}
                                            width={53}
                                            alt="..."
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                                <div className="grid py-42 tablet:py-96  laptop:py-16 desktop:py-28 desktop-sm:pt-[275px] desktop-md:pt-[325px] grid-flow-row justify-center gap-8">
                                    <div>
                                        <Link
                                            href="https://www.instagram.com/nettoyer.shoes/"
                                            title="Instagram"
                                            aria-label="Instagram"
                                            target="_blank"
                                        >
                                            <svg
                                                width="27"
                                                height="27"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM1 7C1 3.68629 3.68629 1 7 1H17C20.3137 1 23 3.68629 23 7V17C23 20.3137 20.3137 23 17 23H7C3.68629 23 1 20.3137 1 17V7Z"
                                                    fill="#4A89B0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12.4833 8.98918C11.8591 8.89662 11.2217 9.00324 10.6616 9.29386C10.1015 9.58449 9.64727 10.0443 9.36357 10.608C9.07988 11.1716 8.98113 11.8103 9.08138 12.4333C9.18163 13.0563 9.47577 13.6319 9.92196 14.0781C10.3682 14.5242 10.9437 14.8184 11.5667 14.9186C12.1897 15.0189 12.8284 14.9201 13.392 14.6364C13.9557 14.3527 14.4155 13.8985 14.7061 13.3384C14.9968 12.7783 15.1034 12.1409 15.0108 11.5167C14.9164 10.88 14.6197 10.2905 14.1646 9.83541C13.7095 9.38028 13.12 9.08359 12.4833 8.98918ZM9.74043 7.51862C10.6739 7.03424 11.7364 6.85655 12.7767 7.01081C13.8379 7.16817 14.8203 7.66264 15.5788 8.4212C16.3374 9.17975 16.8318 10.1622 16.9892 11.2233C17.1435 12.2636 16.9658 13.3261 16.4814 14.2596C15.997 15.1931 15.2306 15.9501 14.2912 16.4229C13.3518 16.8957 12.2873 17.0603 11.2489 16.8932C10.2106 16.7261 9.2514 16.2359 8.50775 15.4923C7.76409 14.7486 7.27386 13.7894 7.10678 12.7511C6.9397 11.7128 7.10428 10.6482 7.5771 9.70878C8.04993 8.76938 8.80693 8.00299 9.74043 7.51862Z"
                                                    fill="#4A89B0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.5 6.5C16.5 5.94772 16.9477 5.5 17.5 5.5H17.51C18.0623 5.5 18.51 5.94772 18.51 6.5C18.51 7.05228 18.0623 7.5 17.51 7.5H17.5C16.9477 7.5 16.5 7.05228 16.5 6.5Z"
                                                    fill="#4A89B0"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="https://www.tiktok.com/@nettoyer.shoes"
                                            title="TikTok"
                                            aria-label="TikTok"
                                            target="_blank"
                                        >
                                            <svg
                                                width="27"
                                                height="27"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18.1155 6.00894C17.0382 5.30651 16.2606 4.18262 16.0181 2.87246C15.9657 2.5894 15.9369 2.29807 15.9369 2H12.4985L12.493 15.78C12.4352 17.3231 11.1651 18.5616 9.60816 18.5616C9.12425 18.5616 8.6686 18.4406 8.26741 18.2295C7.34742 17.7454 6.71783 16.781 6.71783 15.6713C6.71783 14.0775 8.0145 12.7808 9.60816 12.7808C9.90565 12.7808 10.191 12.8299 10.461 12.9145V9.40424C10.1816 9.3662 9.89778 9.34242 9.60816 9.34242C6.11842 9.34242 3.27942 12.1816 3.27942 15.6713C3.27942 17.8124 4.34917 19.7072 5.9812 20.853C7.00918 21.5747 8.2596 22 9.60816 22C13.0979 22 15.9369 19.161 15.9369 15.6713V8.68367C17.2855 9.65161 18.9377 10.222 20.7206 10.222V6.7836C19.7602 6.7836 18.8657 6.49808 18.1155 6.00894Z"
                                                    fill="#4A89B0"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="https://www.youtube.com/@Nettoyer.Shoes_IDN"
                                            title="YouTube"
                                            aria-label="YouTube"
                                            target="_blank"
                                        >
                                            <svg
                                                width="27"
                                                height="27"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_23_115)">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M11.9999 3C12 3 12 3 12 4L12 5L11.9245 5.00011C11.8745 5.00022 11.8006 5.00044 11.7057 5.00089C11.516 5.00178 11.2425 5.00356 10.9088 5.00713C10.2411 5.01427 9.334 5.02855 8.37473 5.05706C7.41385 5.08561 6.40863 5.12821 5.54214 5.19141C4.65403 5.25619 3.99414 5.33761 3.66537 5.42419C3.36667 5.51 3.0956 5.67253 2.87916 5.89566C2.66803 6.11333 2.51612 6.38119 2.43763 6.67375C2.13809 8.34737 1.99161 10.0448 2.00001 11.7451L2.00007 11.7563C1.98935 13.4635 2.13473 15.1681 2.4345 16.8487C2.52112 17.1264 2.67455 17.3788 2.8816 17.5837C3.09851 17.7984 3.36696 17.9537 3.66116 18.0347C3.98848 18.1217 4.65022 18.2035 5.54214 18.2686C6.40863 18.3318 7.41385 18.3744 8.37473 18.4029C9.334 18.4314 10.2411 18.4457 10.9088 18.4529C11.2425 18.4564 11.516 18.4582 11.7057 18.4591C11.8006 18.4596 11.8745 18.4598 11.9245 18.4599H12.0755C12.1255 18.4598 12.1994 18.4596 12.2943 18.4591C12.4841 18.4582 12.7575 18.4564 13.0912 18.4529C13.759 18.4457 14.666 18.4314 15.6253 18.4029C16.5862 18.3744 17.5914 18.3318 18.4579 18.2686C19.346 18.2038 20.0059 18.1224 20.3347 18.0358C20.6334 17.95 20.9044 17.7875 21.1209 17.5643C21.332 17.3467 21.4839 17.0788 21.5624 16.7863C21.8596 15.1253 22.0061 13.4409 22 11.7536L22 11.7437C22.0108 10.0306 21.8643 8.32008 21.5624 6.63377C21.4839 6.3412 21.332 6.07333 21.1209 5.85566C20.9069 5.63509 20.6396 5.47373 20.3449 5.38717C20.005 5.3072 19.3426 5.23348 18.4642 5.17498C17.596 5.11716 16.5894 5.07822 15.6279 5.05213C14.6679 5.02609 13.7603 5.01304 13.0921 5.00651C12.7583 5.00325 12.4846 5.00162 12.2947 5.00081L12.0757 5.0001L12 5L12 4C12 3 12 3 11.9999 3L12.0797 3.0001C12.1312 3.00021 12.2067 3.00042 12.3033 3.00083C12.4964 3.00166 12.7737 3.00331 13.1117 3.00661C13.7873 3.01321 14.7071 3.02641 15.6821 3.05287C16.6557 3.07928 17.6916 3.11909 18.5971 3.1794C19.4767 3.23798 20.3115 3.32017 20.8372 3.44854C20.849 3.45141 20.8606 3.45448 20.8723 3.45777C21.5123 3.63886 22.0933 3.98566 22.5565 4.46315C23.0196 4.94063 23.3486 5.53189 23.5101 6.17719L22.54 6.42L23.5241 6.24249C23.852 8.06021 24.0113 9.90432 24 11.7513C24.0063 13.5707 23.847 15.3869 23.5242 17.1774C23.5202 17.1994 23.5155 17.2212 23.5101 17.2428C23.3486 17.8881 23.0196 18.4794 22.5565 18.9569C22.0933 19.4343 21.5123 19.7811 20.8723 19.9622L20.8584 19.966C20.3247 20.1088 19.4827 20.1992 18.6034 20.2633C17.6961 20.3295 16.6589 20.3731 15.6847 20.4021C14.709 20.4311 13.7886 20.4455 13.1126 20.4528C12.7744 20.4564 12.4969 20.4582 12.3037 20.4591C12.2071 20.4595 12.1315 20.4598 12.0799 20.4599L12.0005 20.46L11.9201 20.4599C11.8685 20.4598 11.793 20.4595 11.6963 20.4591C11.5031 20.4582 11.2256 20.4564 10.8875 20.4528C10.2115 20.4455 9.29105 20.4311 8.31532 20.4021C7.34119 20.3731 6.30392 20.3295 5.39665 20.2633C4.51735 20.1992 3.67531 20.1088 3.14166 19.966L3.1361 19.9646C2.50903 19.793 1.93681 19.4626 1.47473 19.0052C1.01265 18.5479 0.67633 17.9792 0.498264 17.3539C0.489225 17.3222 0.481762 17.29 0.475904 17.2575C0.148065 15.44 -0.0112431 13.5961 7.33562e-06 11.7493C-0.00870692 9.91636 0.150588 8.08643 0.475897 6.28253C0.479851 6.2606 0.484537 6.23881 0.489948 6.21719C0.651466 5.57189 0.980418 4.98063 1.44358 4.50315C1.90674 4.02566 2.4877 3.67886 3.12779 3.49777L3.14166 3.49395C3.67531 3.35123 4.51735 3.26085 5.39665 3.19671C6.30392 3.13054 7.34119 3.08689 8.31532 3.05794C9.29105 3.02895 10.2115 3.01448 10.8875 3.00724C11.2256 3.00363 11.5031 3.00182 11.6963 3.00091C11.793 3.00046 11.8685 3.00023 11.9201 3.00011L11.9999 3Z"
                                                        fill="#4A89B0"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.24718 7.61562C9.55499 7.43656 9.9348 7.43471 10.2443 7.61075L15.9943 10.8807C16.3069 11.0585 16.5 11.3904 16.5 11.75C16.5 12.1096 16.3069 12.4415 15.9943 12.6193L10.2443 15.8893C9.9348 16.0653 9.55499 16.0635 9.24718 15.8844C8.93937 15.7053 8.75 15.3761 8.75 15.02V8.48001C8.75 8.12391 8.93937 7.79467 9.24718 7.61562ZM10.75 10.1991V13.3009L13.4771 11.75L10.75 10.1991Z"
                                                        fill="#4A89B0"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_115">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>
            </div>
                )}
            <ModalSocials showModal={showModal} setshowModal={setshowModal} />
        </>
    );
};

export default Sidebar;
