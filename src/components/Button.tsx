"use client";

import clsx from "clsx";
import { FC } from "react";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  name?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  variant,
  name,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      name={name}
      className={clsx(
        variant === "primary"
          ? "bg-orange hover:bg-pink"
          : "hover:text-pink hover:border-pink border-gray-200-2 text-secondary border-2 bg-white",
        "rounded-full px-6 py-3 font-bold transition duration-150 ease-in-out",
        className
      )}
    >
      {text}
    </button>
  );
};
