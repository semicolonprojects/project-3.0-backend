"use client";

import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { detailArtikel } from "../_api/api";

const Page = ({ params }) => {
    const [artikel, setArtikel] = useState("");

    useEffect(() => {
        const fetchArtikel = async () => {
            try {
                const data = await detailArtikel(params.slug);
                setArtikel(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchArtikel();
    }, []);

    return (
        <div className="p-4 ml-80">
            <div className="py-20 pb-10">
                <div className="flex justify-center items-center">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${artikel.image}`}
                    />
                </div>
                <div className="py-5">{parse(`${artikel.isi_artikel}`)}</div>
            </div>
        </div>
    );
};

export default Page;
