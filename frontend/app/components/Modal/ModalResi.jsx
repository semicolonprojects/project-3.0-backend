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
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-3 md:p-6 mt-2 md:mt-3 rounded-md justify-center overflow-hidden">
                        <div className="grid gap-3 h-auto justify-center">
                            <p className="font-semibold text-base md:text-lg mt-2">
                                Detail Status
                            </p>
                            <div className="pb-2">
                                <p className="mt-1 text-lg font-extrabold text-yellow-400">
                                    No. Resi {details[0].kode_resi}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 pb-4">
                                <div className="text-sm md:text-base">
                                    <span className="inline-flex font-semibold">
                                        Status :
                                        <p className="font-normal ml-2">
                                            {details[0].status_pengerjaan}
                                        </p>
                                    </span>
                                </div>
                                <div className="text-sm md:text-base">
                                    <span className="inline-flex font-semibold">
                                        Atas Nama :
                                        <p className="font-normal ml-2">
                                            {details[0].nama_pelanggan}
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 pb-4">
                                <div className="text-sm md:text-base">
                                    <span className="inline-flex font-semibold">
                                        Pengirim :
                                        <p className="font-normal ml-2">
                                            {details[0].pengirim}
                                        </p>
                                    </span>
                                </div>
                                <div className="text-sm md:text-base">
                                    <span className="inline-flex font-semibold">
                                        Penerima :
                                        <p className="font-normal ml-2">
                                            {details[0].penerima}
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="grid grid-rows-auto bg-slate-50 rounded-md p-3 md:p-6 overflow-y-auto">
                            <p className="font-semibold text-base md:text-lg mb-3">
                                Riwayat Status Pengerjaan
                            </p>

                            <div className="relative border-l-2 border-gray-300">
                                {details.map((data, index) => (
                                    <div key={index} className="mb-6 pl-6">
                                        <div className="absolute w-2.5 h-2.5 rounded-full mt-1 -left-2 border-4 border-yellow-400 bg-yellow-400"></div>
                                        <time className="text-xs font-normal leading-none text-gray-400">
                                            {formatDate(data.created_at)}
                                        </time>
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {data.status_pengerjaan}
                                            </p>
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
