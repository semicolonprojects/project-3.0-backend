"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../api/v2/product/getProduct";
import { getServices } from "../../api/v2/service/getService";
import { getArtikel } from "../../api/v2/artikel/getArtikel";
import Link from "next/link";

const CardInfo = () => {
    const [countProduct, setCountProduct] = useState("");
    const [countService, setCountService] = useState("");
    const [countArtikel, setCountArtikel] = useState("");

    useEffect(() => {
        const countProduct = async () => {
            try {
                const product = await getProducts();
                setCountProduct(product.length);
            } catch (error) {
                console.log(error);
            }
        };

        const countService = async () => {
            try {
                const service = await getServices();
                setCountService(service.length);
            } catch (error) {
                console.log(error);
            }
        };

        const countArtikel = async () => {
            try {
                const artikel = await getArtikel();
                setCountArtikel(artikel.length);
            } catch (error) {
                console.log(error);
            }
        };

        countProduct();
        countService();
        countArtikel();
    }, []);

    return (
        <div className="grid grid-flow-col gap-2 py-20 pb-5">
            <Link
                href="/dashboard/products"
                className=" bg-white w-72 p-4 rounded-md shadow-sm"
            >
                <div className="grid grid-flow-row">
                    <p className="font-bold text-2xl">Products</p>
                    <p className="font-extrabold text-4xl">{countProduct}</p>
                </div>
            </Link>
            <Link
                href="/dashboard/services"
                className=" bg-white w-72 p-4 rounded-md shadow-sm"
            >
                <div className="grid grid-flow-row">
                    <p className="font-bold text-2xl">Services</p>
                    <p className="font-extrabold text-4xl">{countService}</p>
                </div>
            </Link>
            <Link
                href="/dashboard/artikel"
                className=" bg-white w-72 p-4 rounded-md shadow-sm"
            >
                <div className="grid grid-flow-row">
                    <p className="font-bold text-2xl">Artikel</p>
                    <p className="font-extrabold text-4xl">{countArtikel}</p>
                </div>
            </Link>
        </div>
    );
};

export default CardInfo;
