import { Booking } from "@/types";
export type CreateBookingDto = {
  email: string;
  bookDate: string;
  dentist_id: string;
};
export type FindAllBookingDto = {
  success: boolean;
  count: number;
  data: Booking[];
};
export type FindBookingByIDDto = {
  success: boolean;
  data: Booking;
};
export type FindBookingByDentistIDDto = {
  success: boolean;
  data: Booking[];
};
