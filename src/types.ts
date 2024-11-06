export type User = {
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
};

export type Booking = {
  bookingDate: string;
  user: string;
  dentist: string;
  createdAt: string;
};

export type Dentist = {
  name: string;
  hospital: string;
  address: string;
  expertist: string;
  tel: string;
  picture: string;
};
