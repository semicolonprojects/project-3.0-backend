"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

export default function HomeLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex h-full">
                <Sidebar />
                <main className="inline-flex flex-col h-full w-full">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
}
