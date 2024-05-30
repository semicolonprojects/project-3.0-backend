"use client";

import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Promo = () => {
  const [getPromoId, setPromoId] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [getPromo, setGetPromo] = useState([]);

  const [promoData, setPromoData] = useState({
    title: "",
    description: "",
    valid_date: "",
    is_visible: true,
  });

  const fetchPromoData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo`
      );
      setGetPromo(response.data.promos);
    } catch (error) {
      console.error("Error fetching promo:", error);
      toast.error("Failed to fetch promo", { position: "bottom-right" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      toast.loading(getPromoId ? "Updating Promo..." : "Creating Promo...", {
        position: "bottom-right",
      });
      let response;
      if (getPromoId) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo/${getPromoId.id}`,
          promoData
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo`,
          promoData
        );
      }
      toast.dismiss();
      closeModal();
      toast.success(
        getPromoId
          ? "Promo updated successfully"
          : "Promo created successfully",
        { position: "bottom-right" }
      );
      setPromoData({
        title: "",
        description: "",
        valid_date: "", // Corrected key to match with useState
        is_visible: true,
      });
      fetchPromoData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPromoData();
  }, []);

  const openModal = async (id) => {
    setIsVisible(true);
    if (id) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo/${id}`
        );
        setPromoData(response.data.promo);
        setPromoId(response.data.promo);
      } catch (error) {
        toast.error("Error fetching promo data", {
          position: "bottom-right",
        });
      }
    } else {
      setPromoData({
        title: "",
        description: "",
        valid_date: "",
        is_visible: true,
      });
      setPromoId(null);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPromoData({
      ...promoData,
      [name]: value,
    });
  };

  function formatToWIB(date) {
    var options = {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  const handleDelete = async (promoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this promo?"
    );
    if (!confirmDelete) return;
    try {
      toast.loading();
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promo/${promoId}`
      );
      toast.dismiss();
      toast.success("Promo deleted successfully", {
        position: "bottom-right",
      });
      setGetPromo(getPromo.filter((promo) => promo.id !== promoId));
    } catch (error) {
      toast.error("Failed to delete promo", { position: "bottom-right" });
    }
  };

  return (
    <>
      <div className="bg-white w-[96%] rounded-md shadow-sm p-4 mb-5">
        <div className="grid grid-flow-col">
          <div className="items-start">
            <h1 className="font-bold text-2xl">Promos</h1>
          </div>
          <div className="text-right">
            <button
              onClick={() => openModal()}
              className="bg-green-500 hover:bg-green-400 inline-flex items-center text-white p-2 rounded-lg w-fit"
            >
              <svg
                className="left-0 w-5 h-5 mx-2"
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span className="text-sm">Add New Promo</span>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-2">
          {getPromo.map((promo, index) => (
            <div className="bg-slate-200 rounded-lg p-2 h-44 w-44" key={index}>
              <div className="flex flex-row justify-between items-center border-b border-slate-300">
                <p className="pt-1 text-md font-bold">{promo.title}</p>
                <div className="flex flex-row">
                  <button onClick={() => openModal(promo.id)}>
                    <PencilIcon className="text-blue-500 w-6 h-6" />
                  </button>
                  <button onClick={() => handleDelete(promo.id)}>
                    <TrashIcon className="text-red-500 w-6 h-6" />
                  </button>
                </div>
              </div>
              <p className="text-sm pb-2">{promo.description}</p>
              <p className="text-sm pb-2">
                {promo.is_visible === true ? "Active" : "Inactive"}
              </p>
              <p className="text-sm font-bold">
                Valid Date : <br />
                {formatToWIB(promo.valid_date)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Create Promo */}
      <Modal isVisible={isVisible} onClose={closeModal}>
        <div className="text-center">
          <p className="mb-4">{getPromoId ? "Edit Promo" : "Create Promo"}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter title"
                name="title"
                value={promoData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter description"
                name="description"
                value={promoData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="valid_date"
              >
                Valid Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="valid_date"
                type="date"
                name="valid_date"
                value={promoData.valid_date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="is_visible"
              >
                Is Visible
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="is_visible"
                name="is_visible"
                value={promoData.is_visible}
                onChange={handleChange}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Promo;
