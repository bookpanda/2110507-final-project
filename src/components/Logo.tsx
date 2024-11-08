"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <Link href="/" className="h-full">
      <div
        className="flex h-full items-center space-x-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src="/img/logo.webp"
          alt="logo"
          width={25}
          height={25}
          unoptimized
        />
        <h1 className="font-bold">Dentist Booking</h1>
      </div>
    </Link>
  );
};
