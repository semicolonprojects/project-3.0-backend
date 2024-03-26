"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarServices = () => {
  const [services, setServices] = useState([]);

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

  return (
    <ul className="pt-5 pl-1 flex font-medium text-xs tablet:text-sm gap-6 tablet:gap-7">
      <li>
        <Link
          href="/services"
          className={`hover:underline ${
            pathname === "/services" ? "text-yellow-500" : ""
          } `}
        >
          All Services
        </Link>
      </li>
      {services?.map((service, index) => (
        <li key={index}>
          <Link
            href={`/services/${service.category}`}
            className={`hover:underline ${
              pathname === `/services/${service.category}`
                ? "text-yellow-500"
                : ""
            } `}
          >
            {" "}
            {service.category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarServices;
