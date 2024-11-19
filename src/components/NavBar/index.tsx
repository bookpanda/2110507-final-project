import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Logo } from "../Logo";
import { NavBarItem } from "./NavBarItem";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "admin";

  return (
    <div className="sticky top-0 z-50 flex h-16 w-full justify-around border-b bg-white">
      <div className="flex w-[20%] items-center">
        {session ? (
          <NavBarItem name="Logout" path="/api/auth/signout" />
        ) : (
          <NavBarItem name="Login" path="/api/auth/signin" />
        )}
        {isAdmin ? (
          <NavBarItem name="Create new dentist" path="/dentists/new" />
        ) : (
          <NavBarItem name="My Bookings" path="/mybooking" />
        )}
      </div>
      <div className="flex w-[40%] items-center justify-between md:w-[30%]">
        <NavBarItem name="Book an appointment" path="/booking" />
        {session && (
          <div className="text-lightgray flex h-full items-center px-3">
            {session.user.name}
          </div>
        )}
        <Logo />
      </div>
    </div>
  );
};
