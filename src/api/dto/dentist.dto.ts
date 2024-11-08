import { Dentist } from "@/types";

export type CreateDentistDto = {
  name: string;
  hospital: string;
  address: string;
  expertist: string;
  tel: string;
  picture: string;
};

export type FindAllDentistDto = {
  success: boolean;
  count: number;
  data: Dentist[];
};
