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
                    return toast.error("Data Not Found", {
                        position: "bottom-right",
                    });
                }
                toast.dismiss();
                getDetails(data);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching data", {
                    position: "bottom-right",
                });
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
                    <div className="grid grid-cols-1 gap-6 p-4 md:p-6 mt-4 md:mt-6 rounded-lg shadow-md bg-white max-h-[80vh] overflow-auto">
                        <div className="grid gap-6">
                            {/* Title */}
                            <p className="text-xl font-semibold text-gray-800">Detail Status</p>

                            {/* Resi Number */}
                            <div className="pb-3">
                                <p className="text-2xl font-extrabold text-yellow-500">
                                    No. Resi: {details[0].kode_resi}
                                </p>
                            </div>

                            {/* Status, Customer Info, and Price */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
                                <div className="text-sm md:text-base">
                                    <span className="font-semibold text-gray-600">Status:</span>
                                    <p className="font-normal text-gray-800">{details[0].status_pengerjaan}</p>
                                </div>
                                <div className="text-sm md:text-base">
                                    <span className="font-semibold text-gray-600">Atas Nama:</span>
                                    <p className="font-normal text-gray-800">{details[0].nama_pelanggan}</p>
                                </div>
                            </div>

                            {/* Sender and Receiver Info */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
                                <div className="text-sm md:text-base">
                                    <span className="font-semibold text-gray-600">Pengirim:</span>
                                    <p className="font-normal text-gray-800">{details[0].pengirim}</p>
                                </div>
                                <div className="text-sm md:text-base">
                                    <span className="font-semibold text-gray-600">Penerima:</span>
                                    <p className="font-normal text-gray-800">{details[0].penerima}</p>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="text-sm md:text-base">
                                <span className="font-semibold text-gray-600">Barang:</span>
                                <div className="font-normal text-gray-800">
                                    {details[details.length - 1].nama_item.map((item, index) => {
                                        return (
                                            <div key={index} className="block">
                                                <span>{index + 1}. {item.nama_item}</span>
                                                {item.service_id && item.service_id.length > 0 && item.service_id.map((service, serviceIndex) => (
                                                    <p key={serviceIndex} className="ml-2 text-gray-600">
                                                        - {service.nama_service} {service.price ? `- Rp ${service.price.toLocaleString()}` : ''}</p>
                                                ))}
                                            </div>
                                        );
                                    })}

                                    {/* Total for items */}
                                    <div className="mt-4 font-semibold text-gray-800">
                                        Total: Rp {details[details.length - 1].nama_item.reduce((total, item) => {
                                            const itemTotal = item.service_id?.reduce((acc, service) => acc + Number(service.price || 0),0);
                                            return total + (itemTotal || 0);
                                        }, 0).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Cost Information */}
                            <div className="mt-6">
                                <span className="font-semibold text-gray-600">Pick Up & Delivery</span>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm md:text-base mt-2 p-4 rounded-lg border border-gray-300 bg-slate-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <p className="ml-2 font-normal text-gray-800">
                                            Rp {details[0]?.ongkir?.toLocaleString() ?? '0'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="mt-6 font-semibold text-gray-800">
                                <span className="text-lg">Grand Total: </span>
                                <span className="text-xl text-yellow-500">
                                    Rp {(
                                        details[details.length - 1].nama_item.reduce((total, item) => {
                                            const itemTotal = item.service_id?.reduce((acc, service) => acc + Number(service.price || 0), 0);
                                            return total + (itemTotal || 0);
                                        }, 0) + details[0].ongkir
                                    ).toLocaleString()}
                                </span>
                            </div>

                            {/* Image Section */}
                            <div className="w-full mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {details[details.length - 1].images.map((image, index) => (
                                        <div key={index} className="relative w-full">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/public/cek_resi/${image.name}`}
                                                alt={`Product Image ${index + 1}`}
                                                className="object-contain w-full h-auto max-h-80 rounded-lg shadow-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="bg-slate-50 rounded-lg p-4 md:p-6 overflow-auto shadow-inner">
                            <p className="font-semibold text-lg text-gray-800 mb-3">Riwayat Status Pengerjaan</p>
                            <div className="relative border-l-2 border-gray-300 pl-6 max-h-64 overflow-auto">
                                {details.map((data, index) => (
                                    <div key={index} className="mb-6">
                                        <div className="absolute w-2.5 h-2.5 rounded-full mt-1 -left-2 border-4 border-yellow-400 bg-yellow-400"></div>
                                        <time className="text-xs font-normal leading-none text-gray-400">
                                            {formatDate(data.created_at)}
                                        </time>
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold text-gray-900">{data.status_pengerjaan}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ModalResi;
