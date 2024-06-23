"use client";

import { useEffect, useState } from "react";
import { detectDevice } from "../utils/deviceUtils";
import Spinner from "../components/Spinner";

const Maps = () => {
  const [mobileMaps, setmobileMaps] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleResize = () => {
    const { deviceWidth } = detectDevice();

    // Update the state based on the device width
    setmobileMaps(deviceWidth < 600);
  };

  useEffect(() => {
    // Call the handleResize function when the component mounts
    handleResize();

    // Add event listener to detect changes in screen size
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Simulating map loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []); // useEffect runs once after the initial render

  return (
    <div className="pb-10 relative px-10 md:px-8  xl:px-16 desktop:px-20 flex laptop:justify-end xl:justify-end rounded-md">
      <div className="grid grid-flow-col gap-4 md:gap-8 lg:gap-12">
        <div className="min-w-0 tablet:min-w-[600px] w-full md:w-full lg:w-auto xl:w-auto">
          <p className="py-5 pt-0 text-[#FFB62B] font-bold text-2xl md:text-4xl lg:text-4xl xl:text-5xl">
            Our Store{" "}
          </p>
          <div className="flex flex-wrap sm:flex-nowrap">
            {loading ? (
              <div
                className={`w-${
                  mobileMaps ? "fit" : "full"
                } h-[350px] flex justify-center items-center`}
              >
                <Spinner />
              </div>
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15804.924498217451!2d112.6598634!3d-7.9750483!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629546317a943%3A0xab55c9dea35e5044!2snettoyer.shoes!5e0!3m2!1sen!2sid!4v1707764046040!5m2!1sen!2sid"
                width={mobileMaps ? 300 : 600}
                className="laptop:w-[510px] laptop-lg:w-[600px]"
                height={350}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
