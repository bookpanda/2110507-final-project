export type User = {
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
};

export type Booking = {
  bookingDate: string;
  email: string;
  dentist_id: string;
  createdAt: string;
};

export type Dentist = {
  _id: string;
  name: string;
  hospital: string;
  address: string;
  expertist: string;
  tel: string;
  picture: string;
};
