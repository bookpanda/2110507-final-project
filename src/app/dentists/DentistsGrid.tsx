import { findAllDentist } from "@/app/api/dentist";
import { CgInfo } from "react-icons/cg";

import Image from "next/image";
import Link from "next/link";
export const DentistsGrid = async () => {
  const res = await findAllDentist();
  if (!res) {
    return <div>Failed to fetch dentists</div>;
  }
  const dentists = res.data;

  return (
    <div className="grid grid-cols-3 gap-4">
      {dentists.map((dentist) => (
        <div className="flex h-[35vh] flex-col items-center">
          <Image
            className="h-[150px] w-[150px] rounded-full object-cover"
            src={dentist.picture}
            alt="dentist"
            width={150}
            height={150}
            unoptimized
          />
          <p className="mt-4 text-2xl font-bold">{dentist.name}</p>
          <p className="mt-2 text-lg">{dentist.expertist}</p>
          <Link href={`/dentist/${dentist._id}`} className="w-full">
            <div className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-200 py-3 transition duration-150 ease-in-out hover:bg-pink hover:text-white">
              <CgInfo className="mr-2 h-5 w-5" />
              See Profile
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const DentistsGridSuspense = async () => {
  const dentists: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-3 gap-4">
      {dentists.map((_) => (
        <div className="flex h-[35vh] flex-col items-center">
          <div className="h-[150px] w-[150px] rounded-full bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
