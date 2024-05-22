"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
    const [productTitle, setProductTitle] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productId, setProductId] = useState("");
    const [productImage, setProductImage] = useState("");

    useEffect(() => {
        const detail = async () => {
            try {
                const productData = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${params.slug}`
                );
                const res = productData.data.data;
                setProductName(res.product_name);
                setProductTitle(res.product_name);
                setProductPrice(res.price);
                setProductCategory(res.category);
                setProductId(res.id);
                setProductImage(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/products/${res.image}`
                );
            } catch (error) {
                console.log(error);
            }
        };

        detail();
    }, []);

    return (
        <div className="p-4 ml-80">
            <div className="py-20 pb-10">
                <div className="grid grid-flow-col gap-6 w-fit">
                    <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                        <svg
                            className="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7]  "
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
                    </div>
                    <h1 className="text-3xl font-bold py-5">
                        Products Content Management
                    </h1>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px]">
                <table className="max-w-[974px] w-full text-sm text-left text-gray-500">
                    <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
                        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
                            <div className="">Products Preview</div>
                        </div>
                    </caption>
                    <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
                        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-4 sm:space-x-4">
                            <div className="">{productName}</div>
                        </div>
                    </caption>

                    <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-">
                        <div className="h-64 w-96 relative">
                            <img src={productImage} alt={productName} />
                        </div>
                    </caption>
                </table>
            </div>
        </div>
    );
};

export default Page;
