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

          <div className="grid grid-flow-col p-1 md:p-3 md:pt-0 gap-9 rounded-md justify-center mt-1.5 md:mt-1">
            <div className="grid grid-flow-row gap-2 h-32 justify-center">
              <p className="font-semibold mt-3.5">Detail Status</p>
              <div className="pb-5">
              <p className="mt-1.5 text-xl font-extrabold text-yellow-400">No. Resi {details[0].kode_resi}</p>
              </div>
              <div className="grid grid-flow-col gap-5 pb-5">
              <div className="text-[14px]">
              <span className="inline-flex font-semibold">Status : <p className="font-normal ml-2">{details[0].status_pengerjaan}</p> </span>
              </div>
              <div className="text-[14px]">
                <span className="inline-flex font-semibold">Atas Nama : <p className="font-normal ml-2">{details[0].nama_pelanggan}</p></span>
              </div>
              </div>
              <div className="grid grid-flow-col gap-4 pb-5">
              <div className="text-[14px]">
                <span className="inline-flex font-semibold">Pengirim : <p className="font-normal ml-2">{details[0].pengirim}</p></span>
              </div>
              <div className=" text-[14px]">
              <span className="inline-flex  font-semibold">Penerima : <p className="font-normal ml-2">{details[0].penerima}</p></span>
              </div>
              </div>
             
            </div>
            <div className="grid grid-flow-row items-center p-4 mt-0 md:mt-0 bg-slate-50 rounded-md overflow-y-auto">
              <p className="font-semibold mb-4">Riwayat Status Pengerjaan</p>
              {details.map((data, index) => (
                <div className="bg-none border-s border-gray-400 max-w-md" key={index}>
                  <ol className="relative border-gray-200">
                    <li className="mb-10 ms-4">
                      <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-yellow-400 bg-yellow-400"></div>
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
