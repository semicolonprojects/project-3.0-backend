"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ImageSlider from "./ImageSlider";

import { getServices } from "../../api/v2/service/getService";


function Page() {
  const [services, setServices] = useState([]);
  const [categoryService, setCategoryService] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getServices();

      setServices(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="py-16 tablet:py-5 w-full ">
        <div className="py-2 grid grid-rows-1 gap-x-7 gap-y-10 tablet:grid-flow-col justify-center tablet:justify-start items-center tablet:items-start">
          {services.length > 0 ? (
            services.map((service) => (
              <Link href={`services/${service.slug}`} className="group" key={service.id}>
              <div className="aspect-h-1 aspect-w-1 w-[250px] h-[389px] overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/service/${service.category_image}`}
                  alt="..."
                  width="200"
                  height="389"
                  className="h-full w-full object-cover  group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                {service.nama_service} {service.category}
              </h3>
            </Link>
            ))
          ) : (
            <>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                classNameName="w-[250px] h-[389px] bg-gray-300 animate-pulse"
              ></div>
            ))}
          </>

          ) }
        
          {/* <Link href="/services/reglue" className="group">
            <div className="aspect-h-1 aspect-w-1  w-[250px] h-[389px]  overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src="/img/2.png"
                alt="..."
                width="200"
                height="389"
                className="h-full w-full object-cover  group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-900 font-semibold">
              Services For Your Bags
            </h3>
          </Link>
          <Link href="" className="group">
            <div className="aspect-h-1 aspect-w-1  w-[250px] h-[389px]  overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src="/img/3.png"
                alt="..."
                width="200"
                height="389"
                className="h-full w-full object-cover  group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-900 font-semibold">
              Services For Your Hats
            </h3>
          </Link>
          <Link href="" className="group">
            <div className="aspect-h-1 aspect-w-1  w-[250px] h-[389px]  overflow-hidden  bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src="/img/3.png"
                alt="..."
                width="200"
                height="389"
                className="h-full w-full object-cover  group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-900 font-semibold">
              Other Services
            </h3>
          </Link> */}
        </div>
        {/* <ImageSlider /> */}
        {/*  Cards Service 1 */}
      </div>
    </>
  );
}

export default Page;
