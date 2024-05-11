import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Loading({ loadingRef }) {
  return (
    <div
      className=" tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-full tw-flex-wrap
      "
      ref={loadingRef}
      style={{ transitionDuration: "0.6s" }}
    >
      <div className=" tw-text-center tw-w-56 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="#FF156D"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>{" "}
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Loading",
            500, // wait 1s before replacing "Mice" with "Hamsters"
            "Loading.",
            500,
            "Loading..",
            500,
            "Loading...",
            500,
          ]}
          wrapper="p"
          speed={50}
          deletionSpeed={200}
          style={{ fontSize: "2em", display: "inline-block", color: "white" }}
          repeat={Infinity}
        />
      </div>
    </div>
  );
}
