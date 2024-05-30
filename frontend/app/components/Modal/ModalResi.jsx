"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";
import { detectDevice } from "../../utils/deviceUtils";
import React, { useEffect, useState } from "react";
import { CekResi } from "../../api/v2/cek-status/cekResiDetail";
import toast from "react-hot-toast";

const ModalResi = ({ showModal, inputValue, setshowModal }) => {
  const [mobileInfo, setmobileInfo] = useState(false);
  const [details, getDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clearInputValue, setClearInputValue] = useState("");

  const handleResize = () => {
    const { deviceWidth } = detectDevice();

    setmobileInfo(deviceWidth < 600);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.dismiss();
        if (!inputValue) return;
        toast.loading("Loading", { position: "bottom-right" });
        setLoading(true);
        const data = await CekResi(inputValue);
        if (data.length <= 0) {
          toast.dismiss();
          setLoading(false);
          return toast.error("Data Not Found", { position: "bottom-right" });
        }
        toast.dismiss();
        getDetails(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data", { position: "bottom-right" });
      } finally {
        inputValue === null;
      }
    };

    if (inputValue) {
      fetchData();
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      getDetails([]);
    };
  }, [inputValue]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
  }

  return (
    <>
      {!loading && details.length > 0 && (
        <Modal
          isVisible={showModal}
          onClose={() => setshowModal(false)}
          title="Cek Resi"
        >
          <div className=" flex flex-col md:flex-row p-0 md:p-4 gap-1 md:gap-4 rounded-md">
            <div className="flex-grow bg-gray-200 flex flex-row items-center p-2 rounded-md gap-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              <input
                className="text-base bg-transparent border-none outline-none text-black flex-grow"
                placeholder="Masukkan Nomor Resi ..."
              />
            </div>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-3 py-2 focus:outline-none mt-2 md:mt-0"
            >
              Lacak
            </button>
          </div>

          <div className="block md:flex flex-col md:flex-row p-2 gap-4 rounded-md mt-2">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-0.5 text-center me-2 mb-2 md:mb-0"
            >
              {details[0].kode_resi}
            </button>
          </div>

          <div className="grid grid-flow-col p-1 md:p-2 gap-4 rounded-md justify-center mt-1.5 md:mt-4">
            <div className="grid grid-flow-row gap-3">
              <p className="font-semibold">Detail Status</p>
              <p>{details[0].status_pengerjaan}</p>
              <div className="grid grid-flow-col text-[15px]">
                <p className="flex items-center font-semibold">Pengirim</p>
                <p className="flex items-center">{details[0].pengirim}</p>
              </div>
              <div className="grid grid-flow-col text-[15px]">
                <p className="flex items-center font-semibold">Penerima</p>
                <p className="flex items-center">{details[0].penerima}</p>
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 items-center pl-4 mt-0 md:mt-0">
              <p className="font-semibold">Riwayat Pengiriman</p>
              {details.map((data, index) => (
                <div className="bg-none max-w-md" key={index}>
                  <ol className="relative border-s border-gray-200">
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
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalResi;
