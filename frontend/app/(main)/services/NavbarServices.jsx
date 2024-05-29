"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getServices } from "../../api/v2/service/getService";
import { getServiceCategory } from "../../api/v2/service/getServiceByCategory";


const NavbarServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [category, setCategory] = useState("");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServices();
        setServices(res);
        if (category) { // Fetch filtered data if category is set
          const res = await getServiceCategory(category);
          setFilteredServices(res);
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);

  const handleClick = (event) => {

    setCategory(event.target.value);
  };

  console.log(category);

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
      {filteredServices.map((service, index) => (
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
