"use client";

import DateReserve from "@/components/DateReserve";
import { addBooking } from "@/store/bookSlice";
import { AppDispatch } from "@/store/store";
import { Dentist } from "@/types";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findAllDentist } from "../api/dentist";
import { FreeSlots } from "./FreeSlots";
export default function Booking() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Dayjs | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [dentist, setDentist] = useState<string>("");

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await findAllDentist();
        if (!res || !res.data) {
          throw new Error("Failed to fetch dentists");
        }
        setDentists(res.data);
        console.log(res.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  const makeBooking = (_id: string, bookDate: string, dentist: string) => {
    const item = {
      _id: _id,
      bookDate: bookDate,
      dentist: dentist,
    };

    dispatch(addBooking(item));
    window.alert("Booking successful!");
  };

  if (loading) {
    return <div className="h-[80vh]">Loading...</div>;
  }

  if (error) {
    return <div className="h-[80vh]">Error: {error}</div>;
  }

  return (
    <main className="mb-12 mt-12 flex w-[100%] flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="w-fit space-y-2">
        <FormControl
          variant="standard"
          className="w-auto space-y-3 bg-gray-100"
        >
          <TextField
            variant="standard"
            name="Name"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            variant="standard"
            name="LastName"
            label="LastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            variant="standard"
            name="Citizen ID"
            label="Citizen ID"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <div className="text-md text-left text-gray-600">Dentist</div>
          <Select
            variant="standard"
            name="hospital"
            id="hospital"
            className="h-[2em] w-auto"
            value={dentist}
            onChange={(e) => {
              setDentist(e.target.value);
            }}
          >
            {dentists.map((dentist: Dentist) => (
              <MenuItem key={dentist._id} value={dentist.name}>
                {dentist.name}
              </MenuItem>
            ))}
          </Select>
          <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          <button
            name="Book Vaccine"
            className="block rounded-md bg-sky-600 px-3 py-2 text-white shadow-sm hover:bg-indigo-600"
          >
            Book Vaccine
          </button>
        </FormControl>
      </div>

      <FreeSlots />
    </main>
  );
}
