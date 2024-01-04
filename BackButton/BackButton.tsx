"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  to?: string;
}

const BackButton = ({ to }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    !!to ? router.push(to) : router.back();
  };

  return (
    <div onClick={handleClick} className="go_back black_text cursor-pointer">
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 7H1M1 7L7 13M1 7L7 1"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>Back</p>
    </div>
  );
};

export default BackButton;
