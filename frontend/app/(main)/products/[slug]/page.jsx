"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
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
        const res = await axios.get(url); // Use axios.get instead of fetch
        setData(res.data.data); // Assuming your data is nested under 'data'
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
  const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

  const { data: product, loading: productLoading } = useGetData(
    `${API_URL}/api/v1/products/${params.slug}`
  );
  const { data: randomProducts, loading: randomProductsLoading } = useGetData(
    `${API_URL}/api/v1/products?all`
  );

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
