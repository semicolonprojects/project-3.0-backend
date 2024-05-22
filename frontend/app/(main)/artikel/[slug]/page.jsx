"use client";

import { useEffect, useState } from "react";
import { showArtikel } from "../../../api/v2/artikel/showArtikel";
import parse from "html-react-parser";

const Page = ({ params }) => {
  const [getArtikel, setGetArtikel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showArtikel(params.slug);
        setGetArtikel(data);
      } catch (error) {
        console.error("Error fetching artikel:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-[#FFB62B] font-bold text-3xl md:text-5xl lg:text-6xl text-center mb-6">
        {getArtikel.judul}
      </h1>
      <img
        className="block mx-auto mb-8 max-w-full h-auto"
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${getArtikel.image}`}
        alt={getArtikel.judul}
      />
      <p className="text-gray-700 text-lg leading-relaxed p-16">
        {parse(`${getArtikel.isi_artikel}`)}
      </p>
    </div>
  );
};

export default Page;
