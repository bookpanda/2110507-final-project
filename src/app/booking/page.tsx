"use client";

import { FormControl, TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { findAllDentist } from "../api/dentist";
import { fetchBookings } from "../api/booking copy";
import { Dentist } from "@/types";
export default function Booking() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Dayjs | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
 

  // Fetch dentists on component mount
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

  const [bookingItems, setBookingItems] = useState([]);


  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchBookings(""); // Call your API function
        if (!res || !res.data) {
          throw new Error("Failed to fetch bookings");
        }
        setBookingItems(res.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);


  const makeBooking = (_id:string,bookDate:string,dentist:string) => {
    const item = {
      _id:_id,
      bookDate:bookDate,
      dentist: dentist,
    
    };

    dispatch(addBooking(item));
    window.alert("Booking successful!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="w-fit space-y-2">
        <FormControl variant="standard" className="w-auto space-y-3 bg-gray-100">
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
          <div className="text-md text-left text-gray-600">Hospital</div>
          <Select
            variant="standard"
            name="hospital"
            id="hospital"
            className="w-auto h-[2em]"
            value={hospital}
            onChange={(e) => {
              setHospital(e.target.value);
            }}
          >
            {dentists.map((dentist: any) => (
              <MenuItem key={dentist.hospital} value={dentist.hospital}>
                {dentist.name}
              </MenuItem>
            ))}
          </Select>
          <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          <button
        
            name="Book Vaccine"
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
          >
            Book Vaccine
          </button>
        </FormControl>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">Existing Bookings</h2>
        {bookingItems.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {bookingItems.map((booking: any, index) => (
              <li
                key={index}
                className="border p-2 rounded-md bg-gray-50 shadow-sm"
              >
                <div><strong>Name:</strong> {booking.dentist.name}</div>
                <div><strong>Date:</strong> {booking.bookingDate}</div>
                <div><strong>Hospital:</strong> {booking.dentist.hospital}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </main>
  );
}
