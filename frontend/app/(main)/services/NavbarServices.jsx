"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getServices } from "../../api/v2/service/getService";
import { getServiceByCategory } from "../../api/v2/service/getServiceByCategory";
import Link from "next/link";

const NavbarServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [category, setCategory] = useState("");
  const [getClickCategory, setGetClickCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getClickCategory) {
          // Fetch filtered data if category is set
          const filteredRes = await getServiceByCategory(getClickCategory);
          console.log("🚀 ~ fetchData ~ filteredRes:", filteredRes);
          setFilteredServices(filteredRes);
        } else {
          // const res = await getServices();
          // setServices(res);
          const filteredRes = await getServiceByCategory("all");
          setFilteredServices(filteredRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category, getClickCategory]);

  const handleClick = async (event) => {
    const clickedValue = event.target.value;
    setGetClickCategory(clickedValue);
  };

  console.log(filteredServices);

  return (
    <>
      <ul className="pt-5 pl-1 flex font-medium text-xs tablet:text-sm gap-6 tablet:gap-7">
        <li>
          <button
            value={""}
            onClick={handleClick}
            className={`hover:underline ${
              category === "" ? "text-yellow-500" : ""
            } `}
          >
            All Services
          </button>
        </li>
        {filteredServices.map((service, index) => (
          <li key={index}>
            <button
              value={service.category}
              onClick={handleClick}
              className={`hover:underline ${
                service.category === category ? "text-yellow-500" : ""
              } `}
            >
              {" "}
              {service.category}
            </button>
          </li>
        ))}
      </ul>
      <div className="py-16 tablet:py-5 w-full ">
        <div className="py-2 grid grid-rows-1 gap-x-7 gap-y-10 tablet:grid-flow-col justify-center tablet:justify-start items-center tablet:items-start">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Link
                href={`services/${service.slug}`}
                className="group"
                key={service.id}
              >
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
          )}

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
};

export default NavbarServices;
