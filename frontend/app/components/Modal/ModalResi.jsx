"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";
import { detectDevice } from "../../utils/deviceUtils";
import { useEffect, useState } from "react";

const ModalResi = ({ showModal, inputValue, setshowModal }) => {
  const [mobileInfo, setmobileInfo] = useState(false);

  const handleResize = () => {
    const { deviceWidth } = detectDevice();

    // Update the state based on the device width
    setmobileInfo(deviceWidth < 600);
  };

  useEffect(() => {
    // Call the handleResize function when the component mounts
    handleResize();

    // Add event listener to detect changes in screen size
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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
          {inputValue}
        </button>
      </div>

      <div className="grid grid-flow-col p-1 md:p-2 gap-4 rounded-md justify-center mt-1.5 md:mt-4">
        <div className="grid grid-flow-row gap-3">
          <p className="font-semibold">Detail Status</p>
          <div className="grid grid-flow-col gap-4">
            <p className="flex items-center font-semibold text-[#FFB62A]">
              No. Resi {inputValue}
            </p>
            {mobileInfo ? (
              <p className="flex items-center font-semibold text-[#FFB62A]">
                Delivered
              </p>
            ) : (
              <button
                type="button"
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Delivered
              </button>
            )}
          </div>
          <div className="grid grid-flow-col text-[15px]">
            <p className="flex items-center font-semibold">Pengirim</p>
            <p className="flex items-center">Joni</p>
          </div>
          <div className="grid grid-flow-col text-[15px]">
            <p className="flex items-center font-semibold">Penerima</p>
            <p className="flex items-center">Joni</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-3 items-center pl-4 mt-0 md:mt-0">
          <p className="font-semibold">Riwayat Pengiriman</p>
          <div className="bg-none max-w-md">
            <ol className="relative border-s border-gray-200">
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                  February 2022
                </time>
                <h3 className="text-lg font-semibold text-gray-900"></h3>
                <p className="mb-4 text-base font-normal text-gray-500 ">
                  Get access to over 20+ pages including a dashboard layout,
                  charts, kanban board, calendar, and pre-order E-commerce &
                  Marketing pages.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalResi;
