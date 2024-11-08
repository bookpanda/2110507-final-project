import Link from "next/link";
import { FC } from "react";

interface NavBarItemProps {
  name: string;
  path: string;
}

export const NavBarItem: FC<NavBarItemProps> = ({ name, path }) => {
  return (
    <Link href={path} className="h-full">
      <div className="text-lightgray hover:bg-grayhl flex h-full items-center px-3 transition duration-150 ease-in-out">
        {name}
      </div>
    </Link>
  );
};
