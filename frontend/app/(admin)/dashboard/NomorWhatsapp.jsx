"use client";

import axios from "axios";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";

const NomorWhatsapp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [existNomor, setExistNomor] = useState("");

  const openModal = async () => {
    setIsVisible(true);
    const checkResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getExistsNomor`
    );
    setExistNomor(checkResponse.data.data);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (event) => {
    toast.loading("Loading ...", { position: "bottom-right" });
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const nomor = formData.get("nomor");

      const checkResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getExistsNomor`
      );
      console.log("🚀 ~ handleSubmit ~ checkResponse:", checkResponse);

      if (checkResponse.data.data !== null) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nomors/${checkResponse.data.data.id}`,
          {
            nomor: nomor,
          }
        );
        toast.dismiss();
        toast.success("Nomor Whatsapp berhasil diperbarui.", {
          position: "bottom-right",
        });
      } else {
        // Data doesn't exist, perform create
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nomors`,
          {
            nomor: "62" + nomor,
          }
        );
        toast.dismiss();
        toast.success("Nomor Whatsapp berhasil ditambahkan.", {
          position: "bottom-right",
        });
      }
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss();
      toast.error(
        "Terjadi kesalahan saat menambahkan atau memperbarui nomor Whatsapp. Silakan coba lagi.",
        {
          position: "bottom-right",
        }
      );
      closeModal();
    }
  };
  return (
    <>
      <button
        href="/dashboard"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
        onClick={() => openModal()}
        role="menuitem"
      >
        Nomor Whatsapp
      </button>
      <Modal isVisible={isVisible} onClose={closeModal}>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold">
              {existNomor ? "Edit Nomor Whatsapp" : "Create Nomor Whatsapp"}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor Whatsapp
                </label>
                <div className="flex">
                  {!existNomor && (
                    <span className="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +62
                    </span>
                  )}
                  <input
                    type="text"
                    id="nomor"
                    name="nomor"
                    className="flex-1 mt-1 p-2 border-gray-300 rounded-md"
                    defaultValue={existNomor ? existNomor.nomor : ""}
                    maxLength="13"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {existNomor ? "Edit" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NomorWhatsapp;
