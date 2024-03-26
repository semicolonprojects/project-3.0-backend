"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ModalResi from "../../components/Modal/ModalResi";

const Resi = () => {
  const [showModal, setshowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const searchButton = (e) => {
    if (inputValue === null || inputValue.trim() === "") {
      toast.error("Masukkan Nomor Resi Terlebih Dahulu", {
        position: "bottom-right",
      });
      setshowModal(false);
      return;
    }
    setshowModal(true);
  };

  return (
    <>
      <div className="px-28 w-56 h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[#E1EAF3] flex items-center justify-center">
          <div className="flex justify-center md:px-32 md:justify-end md:w-auto py-5 w-screen">
            <div className="relative max-w-max p-5 flex-col">
              <p className="text-[#FFB62B] py-1 font-bold text-3xl desktop:text-5xl text-center">
                Status
              </p>
              <p className="text-blue-400 py-1 font-normal text-lg desktop:text-2xl text-center">
                Cek Status Pesanan Kamu Disini !
              </p>
              <div className="w-full desktop:w-full h-auto grid grid-flow-row gap-6">
                <div className="relative py-1">
                  <div className="p-4 bg-[#E1EAF3] hover:shadow-2xl rounded-xl w-[350px] tablet:w-[600px]">
                    <div className=" flex absolute inset-y-0 start-0  items-center ps-4 pointer-events-none">
                      <MagnifyingGlassIcon
                        width={30}
                        height={30}
                        className=""
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Masukkan Resi Anda Disini"
                      className=" text-lg placeholder:text-lg placeholder:tablet:text-2xl md:text-2xl placeholder:text-center  bg-transparent border-b focus:border-blue-400 rounded-md  w-full ps-10 p-1.5 outline-none  text-blue-500"
                      value={inputValue}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={searchButton}
                    type="button"
                    className="place-self-end text-white hover:shadow-2xl bg-blue-500 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm md:text-base lg:text-lg px-6 md:px-14 py-2 md:py-3 me-2 mb-2 focus:outline-none"
                  >
                    Lacak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalResi
        showModal={showModal}
        inputValue={inputValue}
        setshowModal={setshowModal}
      />
    </>
  );
};

export default Resi;
