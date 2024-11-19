interface HospitalItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface HospitalJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: HospitalItem[];
}

interface bookItem {
  _id: string;
  bookDate: string;
  dentist: string;
}

interface Dentist {
  _id: string;

  name: string;

  hospital: string;

  address: string;

  expertist: string;

  tel: string;

  picture: string;
}
