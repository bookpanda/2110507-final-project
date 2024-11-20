import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Logo } from "../Logo";
import { NavBarItem } from "./NavBarItem";
import getUserProfile from "@/libs/getUserProfile";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (!session?.user.token) {
  
  }
  else{  const res = await getUserProfile(session.user.token);
    console.log(res.data)
    if(res.data.role=="admin"){isAdmin=true}}



  return (
    <div className="sticky top-0 z-50 flex h-16 w-full justify-around border-b bg-white">
      <div className="flex w-[20%] items-center">
        {session ? (
          <NavBarItem name="Logout" path="/api/auth/signout" />
        ) : (
          <NavBarItem name="Login" path="/api/auth/signin" />
        )}
        {isAdmin ? (
          <NavBarItem name="Edit Dentists" path="/dentist" />
        ) : (
          <NavBarItem name="My Bookings" path="/mybooking" />
        )}
      </div>
      <div className="flex w-[40%] items-center justify-between md:w-[20%]">
        <NavBarItem name="Book an appointment" path="/booking" />
        <Logo />
      </div>
    </div>
  );
};
