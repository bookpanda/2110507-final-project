"use client";

import clsx from "clsx";
import { FC } from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
  name?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  variant,
  name,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      name={name}
      className={clsx(
        variant === "primary"
          ? "bg-orange hover:bg-pink"
          : "border-gray-200-2 border-2 bg-white text-secondary hover:border-pink hover:text-pink",
        "rounded-full px-6 py-3 font-bold transition duration-150 ease-in-out",
        className
      )}
    >
      {text}
    </button>
  );
};
