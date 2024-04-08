"use client";

import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const Page = () => {
    const cookies = useCookies();

    const router = useRouter();

    const token = cookies.get("token");

    const logout = async (e) => {
        e.preventDefault();

        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`,
            data: {
                token: token,
            },
        })
            .then((response) => {
                console.log(response);
                cookies.remove("token");
                router.push("/login");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <div></div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Page;
