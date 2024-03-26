"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import ImageSlider from "../ImageSlider";

const Page = ({ params }) => {
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://tes.test/api/v1/posts");
      console.log("🚀 ~ Home ~ response.data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();

  return (
    <>
      <div className="py-5 w-full">
        <ImageSlider />
        {/*  Cards Service 1 */}
        <div className="py-16 grid grid-rows-1 gap-x-20 gap-y-10 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-4 justify-center tablet:justify-start items-center tablet:items-start">
          {services.map((service, index) => (
            <Link key={index} href="/services/deep-clean" className="group">
              <div className="aspect-h-1 aspect-w-1 w-[289px] h-[389px] overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src="/img/1.png"
                  alt="..."
                  width="289"
                  height="389"
                  className="h-full w-full object-cover  group-hover:opacity-75"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                {service.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
