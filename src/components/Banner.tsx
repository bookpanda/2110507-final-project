"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./Button";

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="z-10 flex flex-row items-center justify-center gap-x-40 p-20 text-white md:items-start">
        <div className="w-1/3">
          <h1 className="text-orange text-5xl italic">Special Dental Clinic</h1>
          <p className="text-pink mb-4 mt-2 text-3xl italic">
            Faculty of Dentistry, Chaluฯ
          </p>
          <p className="mt-2 text-2xl italic text-black">
            International standard general and specialized dentistry services
            provided by faculty and expert dentists under the working principle
            of safety, fast and quality service.
          </p>
          <div className="mt-8 flex flex-row items-center justify-around gap-4">
            <Link href="/dentists">
              <Button variant="secondary" text="Our dentists"></Button>
            </Link>
            <Link href="/booking">
              <Button variant="primary" text="Book an appointment"></Button>
            </Link>
          </div>
        </div>
        <div className="w-1/3">
          <Image
            className="h-full w-full object-cover"
            src="/img/banner-img.png"
            alt="banner"
            width={1000}
            height={300}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
