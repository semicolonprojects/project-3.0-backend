"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

export default function HomeLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state to true when the component is mounted
    setLoading(true);

    // Simulating map loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []); // useEffect runs once after the initial render

  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <main className="inline-flex flex-col h-full w-full">
          {loading ? (
            <div className="flex-grow flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
