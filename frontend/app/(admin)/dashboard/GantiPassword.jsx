"use client";

import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

const GantiPassword = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const cookies = useCookies();

    const token = cookies.get("token");

    const openModal = async () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password must match", {
                position: "bottom-right",
            });
            return;
        }

        try {
            toast.loading("Loading ...", {
                position: "bottom-right",
            });
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/changePassword`,
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                    token: token,
                }
            );
            toast.dismiss();

            toast.success(response.data.message, {
                position: "bottom-right",
            });
        } catch (error) {
            toast.dismiss();
            if (error.response) {
                toast.error(
                    error.response.data.error || "Something went wrong",
                    {
                        position: "bottom-right",
                    }
                );
            } else {
                toast.error("Network Error. Please try again later.", {
                    position: "bottom-right",
                });
            }
        } finally {
            setIsVisible(false);
        }
    };

    return (
        <>
            <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                onClick={() => openModal()}
                role="menuitem"
            >
                Ganti Password
            </button>
            <Modal isVisible={isVisible} onClose={closeModal}>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 max-w-md w-full space-y-6">
                    <div className="text-center">
                        <h2 className="text-xl font-bold">Ganti Password</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password Saat Ini
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password Baru
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Konfirmasi Password Baru
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default GantiPassword;
