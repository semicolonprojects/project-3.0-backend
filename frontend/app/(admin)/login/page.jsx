"use client";

import Image from "next/image";
import { useState } from "react";
import illustration from "/public/image/ilustrasi_login.svg";
import logo from "/public/image/logo3.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const cookies = useCookies();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Loading ... ", {
            position: "bottom-right",
        });
        const formData = new FormData();

        formData.append("name", username);
        formData.append("password", password);

        await axios
            .post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
                formData
            )
            .then((response) => {
                cookies.set("token", response.data.token);

                toast.dismiss();

                router.push("/dashboard");
            })
            .catch((error) => {
                toast.dismiss();
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                });
            });
    };

    return (
        <>
            <section className="bg-[#f1f1f1] h-screen ">
                <div className="grid grid-cols-2 gap-20 px-20 py-20 pb-10 mx-auto h-full w-full">
                    <div className=" mt-9 w-full max-h-[420px] bg-white rounded-lg shadow-2xl shadow-slate-500 dark:border ">
                        <a
                            href="#"
                            className="flex items-center my-6 mb-2 px-8 text-2xl font-semibold text-gray-900 "
                        >
                            <Image
                                className="w-16 h-10 mr-2.5"
                                src={logo}
                                alt="logo"
                                unoptimized
                            />
                            Nettoyer
                        </a>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Your Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="zain_123"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="bg-gray-50 border placeholder:text-xl border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                                        required=""
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="place-items-end max-w-[977px] w-full h-fit">
                        <Image
                            src={illustration}
                            className="tablet:h-[540px] w-fill"
                            alt="ilustrasi_login"
                            unoptimized
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
