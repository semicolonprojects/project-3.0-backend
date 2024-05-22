"use client";
import { getResi } from "../../_api/api.js";
import { useEffect, useState } from "react";

function Show({ params }) {
    const [resi, setResi] = useState([]);

    useEffect(() => {
        const fetchResi = async () => {
            try {
                const resiData = await getResi(params.id);
                const res = resiData.data;
                console.log("🚀 ~ fetchResi ~ res:", res);
                setResi(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResi;
    }, []);
    return (
        <div className="p-4 ml-80">
            <div className="py-20 pb-10">
                <div className="grid grid-flow-col gap-6 w-fit">
                    <div className="p-4 bg-white bg-opacity-45 rounded-xl shadow-lg">
                        <svg
                            class="flex-shrink-0 w-10 h-11 drop-shadow-lg shadow-black text-[#3f8ac7] "
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                            <path d="M13 5v2" />
                            <path d="M13 17v2" />
                            <path d="M13 11v2" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold py-5">
                        Resi Content Management
                    </h1>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md bg-white bg-opacity-45 sm:rounded-lg max-w-[974px] p-6">
                <div className="mx-5">
                  
                </div>
            </div>
        </div>
    );
}

export default Show;
