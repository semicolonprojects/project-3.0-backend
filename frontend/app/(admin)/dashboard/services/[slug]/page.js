"use client";
import { getService } from "../_api/api.js";
import { useEffect, useState } from 'react';


const Page = ({params}) => {
  const [service, setService ] = useState([]);
  const [productImage, setProductImage] = useState("");

  useEffect(()=> {
      const fetchServices = async () => {
        try {
          const serviceData = await getService(params.slug);
          const res = serviceData.data;
          console.log("🚀 ~ fetchServices ~ res:", res);
          setService(res);
          setProductImage(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/service/${res.image}`
        );
        } catch (error) {
          console.log(error);
        }

      };

      fetchServices();
  }, []);

  function formatRupiah(price) {
    const cleanPrice = String(price).replace(/\D/g, "");

    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
  }).format(cleanPrice);

  return formattedPrice;
  }

  return ( 
    <div className="p-4 ml-80">
      <div className="py-20 pb-10">
        <div className="grid grid-flow-col gap-6 w-fit ">
          <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
          <svg class="flex-shrink-0 w-10 h-10 drop-shadow-lg shadow-black text-[#3f8ac7] " fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path>
            </svg>
          </div>
          <h1 className='text-3xl font-bold py-5'>Services Content Management</h1>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
      <div className="mx-5">
          <p className="text-lg font-semibold text-gray-900 mb-5">Preview Services </p>
          <div className="grid grid-cols-2">
          <div className="max-w-md w-full h-full ">
            <img src={productImage} alt={service.nama_service} className="h-[560px] w-96" />
          </div>
          <div className="relative mx-1">
          <div className="flex">
              <h1 className="text-4xl font-bold">{service.nama_service}</h1>
            </div>
            <div className="grid grid-flow-row">
            <p className="text-md font-bold py-1">{service.category}</p>
              <p className="text-xl font-extrabold pb-5">{formatRupiah(service.price)}</p>
            </div>
 
          </div>
          </div>
      </div>
      </div>
      </div>
    );
}
 
export default Page;