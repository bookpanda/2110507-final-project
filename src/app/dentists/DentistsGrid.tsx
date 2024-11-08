import { findAllDentist } from "@/api/dentist";
import Image from "next/image";

export const DentistsGrid = async () => {
  const res = await findAllDentist();
  if (!res) {
    return <div>Failed to fetch dentists</div>;
  }
  const dentists = res.data;

  return (
    <div className="grid grid-cols-3 gap-4">
      {dentists.map((dentist) => (
        <div className="overflow-hidden">
          <Image
            className="h-[150px] w-[150px] rounded-full object-cover"
            src={dentist.picture}
            alt="banner"
            width={150}
            height={150}
            unoptimized
          />
          {dentist.name}
        </div>
      ))}
    </div>
  );
};
