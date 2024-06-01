"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { getProducts } from "../../api/v2/product/getProduct";
import { getProductCategory } from "../../api/v2/product-category/getProductCategory";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [getClickCategory, setGetClickCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProducts(getClickCategory);
      const category = await getProductCategory();
      setProducts(res);
      setGetCategories(category);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getClickCategory]);

  const handleClick = async (event) => {
    const clickedValue = event.target.value;
    setGetClickCategory(clickedValue);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden tablet:block overflow-hidden px-5 laptop:px-44 py-10">
        <h1 className="pt-9 font-bold tracking-tight leading-none text-xl tablet:text-[70px] text-[#FFB62B]">
          Product For You
        </h1>
        <ul className="pt-5 pl-1 flex font-medium text-sm gap-7">
          <li>
            <button
              value=""
              onClick={handleClick}
              className={`hover:underline ${
                getClickCategory === "" ? "text-yellow-500" : ""
              } `}
            >
              All Products
            </button>
          </li>
          {!loading ? (
            getCategories.length > 0 ? (
              getCategories.map((category, index) => (
                <li key={index}>
                  <button
                    value={category.name}
                    onClick={handleClick}
                    className={`hover:underline ${
                      getClickCategory === category.name
                        ? "text-yellow-500"
                        : ""
                    } `}
                  >
                    {category.name}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <p>No categories found.</p>
              </li>
            )
          ) : (
            <li>
              <p>Loading...</p>
            </li>
          )}
        </ul>
        <div className="py-5">
          {/*  Cards Service 1 */}
          <div className="py-2 grid grid-cols-2 gap-x-32 gap-y-10 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-4">
            {!loading ? (
              products.length > 0 ? (
                products.map((product) => (
                  <Link
                    href={`products/${product.slug}`}
                    className="group"
                    key={product.id}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-[250px] h-[389px] overflow-hidden bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/products/${product.image}`}
                        alt={product.product_name}
                        width="250"
                        height="389"
                        className="h-full w-full object-cover group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                      {product.product_name}
                    </h3>
                    <h3 className="mt-2 text-sm text-gray-900 font-medium">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </h3>
                  </Link>
                ))
              ) : (
                <p>No products found.</p>
              )
            ) : (
              // Skeleton Loading Effect
              <>
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[250px] h-[389px] bg-gray-300 animate-pulse"
                  ></div>
                ))}
              </>
            )}
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
            <button
              onClick={handleClick}
              value={""}
              className={`hover:underline ${
                getClickCategory === "" ? "text-yellow-500" : ""
              } `}
            >
              Show All
            </button>
          </li>
          {!loading ? (
            getCategories.length > 0 ? (
              getCategories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={handleClick}
                    value={category.name}
                    className={`hover:underline ${
                      getClickCategory === category.name
                        ? "text-yellow-500"
                        : ""
                    } `}
                  >
                    {category.name}
                  </button>
                </li>
              ))
            ) : (
              <li>Categories Not Found</li>
            )
          ) : (
            <li>Loading categories...</li>
          )}
        </ul>
        <div className="py-5 flex justify-center items-center">
          {/*  Cards Service 1 */}
          <div className=" py-2 grid grid-cols-1 gap-x-20 gap-y-10 tablet:grid-cols-4 laptop:grid-cols-4 desktop:grid-cols-4">
            {!loading ? (
              products.length > 0 ? (
                products.map((product) => (
                  <Link
                    href={`products/${product.slug}`}
                    className="group"
                    key={product.id}
                  >
                    <div className="aspect-w-7 aspect-h-8 w-[217px] h-[287px] overflow-hidden bg-gray-300">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/products/${product.image}`}
                        alt={product.product_name}
                        width="217"
                        height="287"
                        className="object-cover w-full h-full group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-center text-gray-900">
                      {product.product_name}
                    </h3>
                    <h3 className="mt-2 text-sm font-medium text-center text-gray-900">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </h3>
                  </Link>
                ))
              ) : (
                <p>Product Not Found</p>
              )
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-w-7 aspect-h-8 w-[217px] h-[287px] overflow-hidden bg-gray-300">
                    <div className="w-full h-full bg-gray-400"></div>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-center text-gray-900 bg-gray-400 w-32 h-4"></h3>
                  <h3 className="mt-2 text-sm font-medium text-center text-gray-900 bg-gray-400 w-20 h-4"></h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
