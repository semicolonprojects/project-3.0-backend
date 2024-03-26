"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/v1/dummy-data");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden tablet:block overflow-hidden px-5 laptop:px-44 py-10">
        <h1 className="pt-9 font-bold tracking-tight leading-none text-xl tablet:text-[70px] text-[#FFB62B]">
          Product For You
        </h1>
        <ul className="pt-5 pl-1 flex font-medium text-sm gap-7">
          <li>
            <Link href="#" className="hover:underline text-[#FFB62B]">
              All Products
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:underline ">
              {" "}
              Shoes Care
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:underline ">
              {" "}
              Sandals Care{" "}
            </Link>
          </li>
          <li>
            <Link href="" className="hover:underline ">
              {" "}
              Bag Care{" "}
            </Link>
          </li>
          <li>
            <Link href="" className="hover:underline ">
              {" "}
              Hat Care{" "}
            </Link>
          </li>
        </ul>
        <div className="py-5">
          {/*  Cards Service 1 */}
          <div className=" py-2 grid grid-cols-2 gap-x-32 gap-y-10 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-4">
            {products?.map((product) => (
              <Link
                href={`products/${product.slug}`}
                className="group"
                key={product.id}
              >
                <div className="aspect-h-1 aspect-w-1 w-[250px] h-[389px] overflow-hidden bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    width="250"
                    height="389"
                    className="h-full w-full object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                  {product.productName}
                </h3>
                <h3 className="mt-2 text-sm text-gray-900 font-medium">
                  Rp {product.priceIDR}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div class="block tablet:hidden h-screen w-screen overflow-x-hidden flex-col justify-center items-center py-32">
        <h1 class="text-center py-5 font-bold tracking-tight leading-none text-3xl text-[#FFB62B]">
          Product For Your Shoes
        </h1>
        <ul class="w-screen mx-auto flex font-medium text-sm gap-6 justify-center text-center">
          <li>
            <Link href="#" class="hover:underline text-[#FFB62B]">
              Show All
            </Link>
          </li>
          <li>
            <Link href="/services" class="hover:underline">
              Our Services
            </Link>
          </li>
          <li>
            <Link href="/products" class="hover:underline">
              Our Product
            </Link>
          </li>
          <li>
            <Link href="#" class="hover:underline">
              Promos
            </Link>
          </li>
        </ul>
        <div className="py-5 flex justify-center items-center">
          {/*  Cards Service 1 */}
          <div className=" py-2 grid grid-cols-1 gap-x-20 gap-y-10 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-4">
            {products?.map((product) => (
              <Link
                href={`products/${product.slug}`}
                className="group"
                key={product.id}
              >
                <div className="aspect-h-1 aspect-w-1 w-[217px] h-[287px] overflow-hidden bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    width="217"
                    height="287"
                    className="h-full w-full object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-2 text-sm text-gray-900 font-semibold text-center">
                  {product.productName}
                </h3>
                <h3 className="mt-2 text-sm text-gray-900 font-medium text-center">
                  Rp {product.priceIDR}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
