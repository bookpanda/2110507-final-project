import { findDentistByID } from "@/api/dentist";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

interface DentistPageProps {
  params: {
    id: string;
  };
}

export default async function DentistPage({ params }: DentistPageProps) {
  const dentistID = params.id;

  const res = await findDentistByID(dentistID);
  if (!res) {
    return <div>Failed to fetch dentist</div>;
  }
  const dentist = res.data;

  return (
    <main className="mt-[10vh] px-[10vw]">
      <Link href="/dentists" className="flex w-[100px] items-center gap-2">
        <FaChevronLeft /> Go back
      </Link>
      <div className="flex h-[90vh] gap-8">
        <div className="w-[60%]">
          <h1 className="mt-[15vh] text-5xl font-bold">{dentist.name}</h1>
          <h3 className="mt-4 text-xl text-gray-500">{dentist.expertist}</h3>
          <p className="text-md mt-2">Tel: {dentist.tel}</p>
          <h2 className="mt-12 text-2xl font-bold">Affiliated hospital</h2>
          <h3 className="mt-4 text-xl">{dentist.hospital}</h3>
          <p className="text-md text-gray-500">{dentist.address}</p>
        </div>
        <div className="flex w-[40%] flex-col items-center">
          <Image
            className="h-[400px] w-[400px] object-cover"
            src={dentist.picture}
            alt="banner"
            width={400}
            height={400}
            unoptimized
          />
        </div>
      </div>
    </main>
  );
}
