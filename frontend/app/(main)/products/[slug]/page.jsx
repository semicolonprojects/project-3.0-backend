"use client";

import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import DetailDesktop from "./DetailDesktop";
import DetailMobile from "./DetailMobile";

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

const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

const Page = ({ params }) => {
  const { data: product, loading: productLoading } = useGetData(
    `/api/v1/dummy-data/${params.slug}`
  );
  const { data: randomProducts, loading: randomProductsLoading } =
    useGetData("/api/v1/dummy-data");

  const shuffledProducts = useShuffleArray(randomProducts);
  const slicedRandomProducts = shuffledProducts.slice(0, 3);

  return (
    <>
      {productLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="hidden tablet:block py-16">
            <DetailDesktop
              product={product}
              slicedRandomProducts={slicedRandomProducts}
              randomProductsLoading={randomProductsLoading}
            />
          </div>
          <div className="block tablet:hidden h-fit w-screen">
            <DetailMobile
              product={product}
              slicedRandomProducts={slicedRandomProducts}
              randomProductsLoading={randomProductsLoading}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
