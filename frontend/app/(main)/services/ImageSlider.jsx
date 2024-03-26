"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Before from "/public/img/before.png";
import After from "/public/img/after.png";
import Link from "next/link";

function Services() {
  const [imageRevealFraq, setImageRevealFraq] = useState(0);
  const imageContainer = useRef(null);

  const slide = (xPosition) => {
    const containerBoundingRect =
      imageContainer.current?.getBoundingClientRect();

    if (containerBoundingRect) {
      setImageRevealFraq(() => {
        if (xPosition < containerBoundingRect.left) {
          return 0;
        } else if (xPosition > containerBoundingRect.right) {
          return 1;
        } else {
          return (
            (xPosition - containerBoundingRect.left) /
            containerBoundingRect.width
          );
        }
      });
    }
  };

  const handleTouchMove = (event) => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseDown = () => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event) => {
    slide(event.clientX);
  };

  const handleMouseUp = () => {
    window.onmousemove = null;
    window.onmouseup = null;
  };

  return (
    <div
      ref={imageContainer}
      className="max-w-[977px] w-full h-fit mx-auto relative select-none"
    >
      <Image
        src={Before}
        className="h-[300px] tablet:h-[730px] w-fill pointer-events-none"
        alt="..."
        loading="lazy"
      />

      <Image
        src={After}
        style={{
          clipPath: `polygon(0 0, ${imageRevealFraq * 100}% 0, ${
            imageRevealFraq * 100
          }% 100%, 0 100%)`,
        }}
        className="h-[300px] tablet:h-[730px] w-fill absolute inset-0  pointer-events-none"
        alt="..."
        loading="lazy"
      />

      <div
        style={{ left: `${imageRevealFraq * 100}%` }}
        className="absolute inset-y-0"
      >
        <div className="relative h-full">
          <div className="absolute inset-y-0 bg-white w-0.5 -ml-px opacity-50"></div>
          <div
            style={{ touchAction: "none" }}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="h-10 w-10 -ml-5 -mt-5 rounded-full absolute top-1/2 shadow-2xl bg-white flex items-center justify-center cursor-pointer"
          >
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-8 text-gray-500 rotate-90 transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
