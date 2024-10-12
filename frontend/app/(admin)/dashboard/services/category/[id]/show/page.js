"use client";

import React from "react";
import { detailServiceCategory } from "../../_api/api";
import { useEffect, useState } from "react";

function Show({ params }) {
    const [categoryService, setCategoryService] = useState([]);
    const [categoryImage, setCategoryImage] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const serviceData = await detailServiceCategory(params.id);
                const res = serviceData.data;
                console.log("🚀 ~ fetchServices ~ res:", res);
                setCategoryService(res);
                setCategoryImage(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${res.image}`
                );
            } catch (error) {
                console.log(error);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            <div className="mx-5">
                <p className="text-lg font-semibold text-gray-900 mb-5">
                    Preview Service's Category{" "}
                </p>
                <div className="grid grid-cols-2">
                    <div className="max-w-md w-full h-full ">
                        <img
                            src={categoryImage}
                            alt={categoryService.name}
                            className="h-[560px] w-96"
                        />
                    </div>
                    <div className="relative mx-1">
                        <div className="flex">
                            <h1 className="text-4xl font-bold">
                                {categoryService.name}
                            </h1>
                        </div>
                        <div className="grid grid-flow-row">
                            <p className="text-md font-bold py-1">
                                {categoryService.category_barang}
                            </p>
                            <p className="text-xl font-extrabold pb-5"></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Show;
