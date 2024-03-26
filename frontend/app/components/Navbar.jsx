"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState, useMemo } from "react";
import { AnimatePresence, animations, motion } from "framer-motion";
import Link from "next/link";
import Logo from "../../public/img/logo1.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModalSocials from "./Modal/ModalSocials";

const Navbar = () => {
  const [showNavbar, setshowNavbar] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showModal, setshowModal] = useState(false);

  const router = usePathname();

  const onScroll = () => {
    setScrollY(window.pageYOffset);
  };

  const isTop = useMemo(() => scrollY === 0, [scrollY]);

  const tooglerNavbar = () => {
    setshowNavbar((showNavbar) => !showNavbar);
  };

  const closeNavbar = () => {
    setshowNavbar(false);
  };

  const navbarVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
    },
  };

  const navbarTransition = {
    duration: 0.3,
    ease: "easeOut",
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    // Close the navbar when the route changes
    closeNavbar();
  }, [router]); // Listen to changes in the route

  const socials = () => {
    setshowNavbar(false);
    setshowModal(!showModal);
  };

  return (
    <>
      {isTop && (
        <nav className="hidden tablet:block  translate-y-0 transition-transform touch-pan-y bg-[#D9D9D9] p-2.5 text-[#4A89B0] fixed w-full h-11 z-10">
          {/* Your navbar content goes here */}
          <p className="text-center text-base">PROMOPROMOPROMO</p>
        </nav>
      )}

      <div
        className={`${
          showNavbar ? "hidden" : "block"
        } block tablet:hidden w-full ${
          isTop
            ? "translate-y-0 transition-transform duration-75 touch-pan-y"
            : "transform-none transition-transform"
        } z-20 left-0  absolute bg-[#D9D9D9] text-center p-3 h-11`}
        tabIndex={10}
        aria-hidden="true"
      >
        <p className="text-[#4A89B0]">PROMOPROMOPROMO</p>
      </div>
      <nav
        className={`tablet:hidden fixed ${
          isTop
            ? "translate-y-11 transition-transform duration-[70ms] "
            : " transform-none transition-transform"
        }  inline-flex justify-between  items-center z-10 h-fit w-screen p-1 bg-[#D9D9D9] shadow-lg`}
      >
        {/* Logo on the left */}
        <div className="inline-flex pl-2">
          <Link href="/">
            <p className="font-bold text-2xl text-[#FFB62B] cursor-pointer">
              NETT <br /> OYER{" "}
            </p>
          </Link>
        </div>

        {/* Icon on the right */}
        <div className="grid grid-flow-col gap-2  pr-2">
          <Link href="/cek-status">
            <button className="w-24 mt-1.5 rounded-lg text-white text-center text-xs font-semibold p-2.5 bg-[#4A89B0]">
              Cek Resi
            </button>
          </Link>
          <button onClick={tooglerNavbar}>
            <Bars3Icon className=" h-12 w-10 items-center text-[#4A89B0]" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {showNavbar && (
          <motion.div
            key="navbar"
            className="fixed flex p-3 inset-0 bg-[#D9D9D9] z-10 w-full h-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navbarVariants}
            transition={navbarTransition}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <XMarkIcon
              className="absolute top-5 right-5 w-10 h-10 cursor-pointer text-[#4A89B0]"
              onClick={closeNavbar}
            />
            <div className="flex flex-col justify-center items-start gap-5 font-bold text-4xl text-[#4A89B0]">
              <div className="w-full flex justify-center items-center">
                <Image src={Logo} alt="Logo" className="w-48" />
              </div>
              <Link href="/">
                <motion.button
                  key="About Us"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={{ delay: 0.2 }}
                  className="hover:text-[#FFB62B]"
                >
                  About Us
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  key="Our Services"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={{ delay: 0.5 }}
                  className="hover:text-[#FFB62B]"
                >
                  Our Services
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  key=" Our Products"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={{ delay: 0.8 }}
                  className="hover:text-[#FFB62B]"
                >
                  Our Products
                </motion.button>
              </Link>
              <motion.button
                key="Our Socials"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                transition={{ delay: 1.2 }}
                onClick={socials}
                className="hover:text-[#FFB62B]"
              >
                Our Socials
              </motion.button>
              <Link href="/partnership">
                <motion.button
                  key="Our Programs"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={{ delay: 1.5 }}
                  className="hover:text-[#FFB62B]"
                >
                  Our Programs
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalSocials showModal={showModal} setshowModal={setshowModal} />
    </>
  );
};

export default Navbar;
