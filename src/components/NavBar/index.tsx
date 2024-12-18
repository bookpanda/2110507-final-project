import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { Logo } from "../Logo";
import { NavBarItem } from "./NavBarItem";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (!session?.user.token) {
  } else {
    const res = await getUserProfile(session.user.token);
    console.log(res.data);
    if (res.data.role == "admin") {
      isAdmin = true;
    }
  }

  return (
    <div className="sticky top-0 z-50 flex h-16 w-full justify-around border-b bg-white">
      <div className="flex w-[30%] items-center">
        {session ? (
          <NavBarItem name="Logout" path="/api/auth/signout" />
        ) : ( 
          <NavBarItem name="Login" path="/api/auth/signin" />
        )}
        {!session &&
          <NavBarItem name="Register" path="/register" />
        }
         {isAdmin &&
          <NavBarItem name="Register" path="/registerA" />
        }
         {isAdmin &&
          <NavBarItem name="Manage Booking" path="/manageBooking" />
        }
        {isAdmin && (
          <NavBarItem name="Create new dentist" path="/dentists/new" />
        )}
        {isAdmin && <NavBarItem name="Edit Booking" path="/editBooking" />}
      </div>
      <div className="flex w-[40%] items-center justify-between md:w-[30%]">
        {session && (
          <>
            <NavBarItem name="Book an appointment" path="/booking" />
            <div className="text-lightgray flex h-full items-center px-3">
              {session.user.name}
            </div>
          </>
        )}
        <NavBarItem name="Dentist" path="/dentists" />
        <Logo />
      </div>
    </div>
  );
};
