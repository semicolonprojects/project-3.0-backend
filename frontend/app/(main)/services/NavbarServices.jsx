"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarServices = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const pathname = usePathname();

  const getServices = async () => {
    try {
      const res = await fetch("/api/v1/services-dummy-data");
      const data = await res.json();
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleClick = (event) => {
    const category = event.target.value;
    setCategory(category);
  };

  return (
    <ul className="pt-5 pl-1 flex font-medium text-xs tablet:text-sm gap-6 tablet:gap-7">
      <li>
        <button
          value={""}
          onClick={handleClick}
          className={`hover:underline ${
            category === "" ? "text-yellow-500" : ""
          } `}
        >
          All Services
        </button>
      </li>
      {services?.map((service, index) => (
        <li key={index}>
          <button
            value={service.category}
            onClick={handleClick}
            className={`hover:underline ${
              service.category === category ? "text-yellow-500" : ""
            } `}
          >
            {" "}
            {service.category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NavbarServices;
