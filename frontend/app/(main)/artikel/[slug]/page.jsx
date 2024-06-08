"use client";

import { useEffect, useState } from "react";
import {
  showArtikel,
  getAllArtikel,
} from "../../../api/v2/artikel/showArtikel";
import parse from "html-react-parser";
import Link from "next/link";

const Page = ({ params }) => {
  const [getArtikel, setGetArtikel] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [slicedRandomProducts, setSlicedRandomProducts] = useState([]);
  const [slicedRandomProductsMobile, setSlicedRandomProductsMobile] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);

  function join(date, options, separator) {
    function format(option) {
      let formatter = new Intl.DateTimeFormat("en", option);
      return formatter.format(date);
    }
    return options.map(format).join(separator);
  }

  function formatTanggal(created_at) {
    const options = [
      { day: "numeric" },
      { month: "long" },
      { year: "numeric" },
    ];
    const joined = join(new Date(), options, " ");

    return joined;
  }

  const useShuffleArray = (array) => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return shuffleArray(array);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await showArtikel(params.slug);
        const res = await getAllArtikel(data.category_id);
        setGroupData(res);
        setGetArtikel(data);
      } catch (error) {
        console.error("Error fetching artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  useEffect(() => {
    setFilteredArticles(
      groupData.filter((article) => {
        return article.id !== getArtikel.id;
      })
    );
  }, [groupData, getArtikel]);

  useEffect(() => {
    setLoading(true);
    const shuffledProducts = useShuffleArray(filteredArticles);
    setSlicedRandomProducts(shuffledProducts.slice(0, 3));
    setSlicedRandomProductsMobile(shuffledProducts.slice(0, 2));
    setLoading(false);
  }, [filteredArticles]);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden tablet:block container">
        <div className="mx-32 mt-10">
          <nav className="relative " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-0.5 ">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-md font-medium text-gray-700 hover:text-[#4EAEFD] "
                >
                  Home
                </a>
              </li>
              <li></li>
              <li aria-current="page">
                <div className="inline-flex items-center">
                  /
                  <span className="text-md capitalize font-medium text-[#4EAEFD] ms-1">
                    {getArtikel.category}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="text-center my-5 ">
            <span className="capitalize">{getArtikel.category}</span>
            <h1 className="text-[#FFB62B] font-semibold text-3xl md:text-5xl lg:text-6xl text-center my-5 mt-2">
              {getArtikel.judul}
            </h1>
            <span className="capitalize mb-5">
              {formatTanggal(getArtikel.created_at)}
            </span>
          </div>
          <img
            className="block mx-10 mb-8 max-w-7xl max-h-96 rounded-xl w-full"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${getArtikel.image}`}
            alt={getArtikel.judul}
          />
          <div className="p-14 pt-2">
            <p className="text-gray-700 text-lg leading-relaxed text-left ">
              {parse(`${getArtikel.isi_artikel}`)}
            </p>
          </div>
        </div>
        <div className="mx-32 my-10">
          <p className="text-[#FFB62B] font-semibold text-lg md:text-xl lg:text-3xl my-5 mt-2">
            Similar Articles{" "}
          </p>
          <div className="flex justify-between">
            {!loading && slicedRandomProducts.length === 0 ? (
              <p>Artikel Lain Masih Belum Ada</p>
            ) : (
              slicedRandomProducts.map((item, itemIndex) => (
                <div
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                  key={itemIndex}
                >
                  <Link href={`/artikel/${item.slug}`} className="w-96">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${item.image}`}
                      alt={item.judul}
                      className="w-96 h-80 rounded-t-lg"
                    />
                  </Link>
                  <div className="p-5">
                    <div className="px-2 py-4">
                      <Link href={`/artikel/${item.slug}`} className="w-96">
                        <div className="mb-2 text-2xl font-bold tracking-tight text-wrap break-words text-gray-900">
                          {item.judul}
                        </div>
                      </Link>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {item.description ?? "-"}
                      </p>
                    </div>
                    <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 ml-1 mb-2 cursor-pointer">
                      #{item.category}
                    </span>
                    <Link
                      href={`/artikel/${item.slug}`}
                      className="mt-4 block items-center px-3 py-2 w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      key={itemIndex}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block tablet:hidden container">
        <div className="mt-32">
          <div className=" mx-5 ">
            <span className="text-lg capitalize">{getArtikel.category}</span>
            <h1 className="text-[#FFB62B] font-semibold text-[33px] my-2 mt-1">
              {getArtikel.judul}
            </h1>
            <span className="text-lg capitalize mb-5">
              {formatTanggal(getArtikel.created_at)}
            </span>
          </div>
          <img
            className="block ml-4 mb-8 max-w-2xl max-h-80 rounded-xl w-full"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${getArtikel.image}`}
            alt={getArtikel.judul}
          />
          <div className="p-6 pt-2 pb-10">
            <p className="break-words tracking-tighter text-lg ">
              {parse(`${getArtikel.isi_artikel}`)}
            </p>
          </div>
        </div>
        <div className="ml-5 my-10">
          <p className="text-[#FFB62B] font-semibold text-[33px] my-5 mt-2">
            Similar Articles{" "}
          </p>
          <div className="flex justify-between">
            {!loading && slicedRandomProductsMobile.length === 0 ? (
              <p>Artikel Lain Masih Belum Ada</p>
            ) : (
              slicedRandomProductsMobile.map((item, itemIndex) => (
                <div
                  className="max-w-[177px] bg-white border border-gray-200 rounded-lg shadow w-full"
                  key={itemIndex}
                >
                  <Link href={`/artikel/${item.slug}`} className="w-full">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/artikel/${item.image}`}
                      alt={item.judul}
                      className="w-full h-28 rounded-t-lg"
                    />
                  </Link>
                  <div className="p-2">
                    <div className="px-2 py-2">
                      <Link href={`/artikel/${item.slug}`} className="w-full">
                        <div className="mb-2 text-sm font-bold tracking-tight text-wrap break-words text-gray-900">
                          {item.judul}
                        </div>
                      </Link>
                    </div>
                    <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 ml-1 mb-2 cursor-pointer">
                      #{item.category}
                    </span>
                    <Link
                      href={`/artikel/${item.slug}`}
                      className="mt-1 px-1 block items-center text-sm font-bold text-blue-600 hover:underline"
                      key={itemIndex}
                    >
                      Read More
                    </Link>
                  </div>
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
