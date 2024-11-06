import { CreateDentistDto } from "./dto/dentist.dto";

export const createDentist = async (hid: string): Promise<CreateDentistDto> => {
  // await delay(1000);

  const response = await fetch(
    `https://2110507-vaccine-app-backend-mauve.vercel.app/api/v1/hospitals/${hid}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch hospital with id ${hid}`);
  }

  return response.json();
};
