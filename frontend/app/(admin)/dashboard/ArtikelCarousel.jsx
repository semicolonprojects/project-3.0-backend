"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getArtikel } from "../../api/v2/artikel/getArtikel";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteArtikel } from "./artikel/_api/api";
import toast from "react-hot-toast";

const ArtikelCarousel = () => {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    const fetcArtikel = async () => {
      try {
        const data = await getArtikel();
        setArtikel(data);
      } catch (error) {
        console.log("🚀 ~ fetcArtikel ~ error:", error);
      }
    };

    fetcArtikel();
  }, []);

  const handleDeleteArtikel = async (artikelId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artikel?"
    );
    if (!confirmDelete) return; // If the user cancels, do nothing

    try {
      toast.loading("Loading ... ", { position: "bottom-right" });
      await deleteArtikel(artikelId);
      setArtikel(artikel.filter((artikel) => artikel.id !== artikelId));
      toast.dismiss();
      toast.success("Artikel deleted successfully", {
        position: "bottom-right",
      });
      router.refresh();
    } catch (error) {
      console.log("🚀 ~ handleDeleteArtikel ~ error:", error);
      toast.dismiss();
      if (error.response.data) {
        const errors = error.response.data;
        toast.error(errors, {
          position: "bottom-right",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      navigation
      pagination={{
        type: "bullets",
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {artikel.map((artikelSlider, index) => (
        <SwiperSlide className="grid grid-flow-row" key={index}>
          <div className="rounded-md bg-white p-4 pt-2 h-fit">
            <div className="flex flex-row justify-between">
              <p className="font-bold text-xl pb-2">Preview Artikel</p>
              <div className="flex flex-row items-center">
                <Link href={`dashboard/artikel/${artikelSlider.slug}/edit`}>
                  <PencilIcon className="text-blue-500 w-6 h-6" />
                </Link>
                <button onClick={() => handleDeleteArtikel(artikelSlider.id)}>
                  <TrashIcon className="text-red-500 w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="bg-slate-200 w-auto p-4">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${artikelSlider.image}`}
                alt="..."
                width={300}
                height={300}
                className="object-fill w-full "
              />
              <h1 className="my-2 font-bold text-xl">{artikelSlider.judul}</h1>
              <p className="text-base font-normal">
                {artikelSlider.description ?? "-"}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ArtikelCarousel;
