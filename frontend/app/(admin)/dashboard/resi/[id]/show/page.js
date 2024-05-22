"use client";
import { getResi, getResiDataDetail } from "../../_api/api.js";
import { useEffect, useState } from "react";

function Show({ params }) {
  console.log("🚀 ~ Show ~ params:", params.id);
  const [resi, setResi] = useState([]);

  useEffect(() => {
    const fetchResi = async () => {
      try {
        const resiData = await getResiDataDetail(params.id);
        setResi(resiData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResi();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day} ${month} ${year} - ${hour}:${minutes}:${seconds}`;
  }

  return (
    <div className="p-4 ml-80">
      <div className="py-20 pb-10">
        <div className="grid grid-flow-col gap-6 w-fit">
          <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
            <svg
              className="flex-shrink-0 w-10 h-11 drop-shadow-lg shadow-black text-[#3f8ac7] "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold py-5">Resi Content Management</h1>
        </div>
      </div>
      {resi.length > 0 && (
        <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
          <div className="mx-5">
            <div className="grid grid-flow-col p-1 md:p-2 gap-4 rounded-md justify-center mt-1.5 md:mt-4">
              <div className="grid grid-flow-row gap-3">
                <p className="font-semibold">Detail Status</p>
                <div className="grid grid-flow-col gap-x-7">
                  <p className="flex items-center font-semibold text-[#FFB62A]">
                    No. Resi #{resi[0].kode_resi}
                  </p>
                  <button
                    type="button"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {resi[0].status_pengerjaan}
                  </button>
                </div>
                <div className="grid grid-flow-col text-[15px]">
                  <p className="flex items-center font-semibold">Pengirim</p>
                  <p className="flex items-center">{resi[0].pengirim}</p>
                </div>
                <div className="grid grid-flow-col text-[15px]">
                  <p className="flex items-center font-semibold">Penerima</p>
                  <p className="flex items-center">{resi[0].penerima}</p>
                </div>
              </div>
              <div className="grid grid-flow-row gap-3 items-center pl-4 mt-0 md:mt-0">
                <p className="font-semibold">Riwayat Pengiriman</p>
                <div className="bg-none max-w-md">
                  {resi.map((data, index) => (
                    <ol
                      className="relative border-s border-gray-200"
                      key={index}
                    >
                      <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                          {formatDate(data.created_at)}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900"></h3>
                        <p className="mb-4 text-base font-normal text-gray-500 ">
                          {data.status_pengerjaan}
                        </p>
                      </li>
                    </ol>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Show;
