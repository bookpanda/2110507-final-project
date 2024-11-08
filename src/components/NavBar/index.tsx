import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Logo } from "../Logo";
import { NavBarItem } from "./NavBarItem";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 z-50 flex h-16 w-full justify-around border-b">
      <div className="flex w-[20%] items-center">
        {session ? (
          <NavBarItem name="Logout" path="/api/auth/signout" />
        ) : (
          <NavBarItem name="Login" path="/api/auth/signin" />
        )}
        <NavBarItem name="My Bookings" path="/mybooking" />
      </div>
      <div className="flex w-[40%] items-center justify-between md:w-[20%]">
        <NavBarItem name="Booking" path="/booking" />
        <Logo />
      </div>
    </div>
  );
};
