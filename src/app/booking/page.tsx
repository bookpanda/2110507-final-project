"use client";

import DateReserve from "@/components/DateReserve";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/store/bookSlice";
import { Dentist } from "@/types";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFreeBookings } from "../api/booking";
import { findAllDentist } from "../api/dentist";
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
        const res = await fetchFreeBookings(""); // Call your API function
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex w-[100%] flex-col items-center space-y-4">
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

      <div className="mt-6">
        <h2 className="text-lg font-medium">Existing Bookings</h2>
        {bookingItems.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {bookingItems.map((booking: any, index) => (
              <li
                key={index}
                className="rounded-md border bg-gray-50 p-2 shadow-sm"
              >
                <div>
                  <strong>Name:</strong> {booking.dentist.name}
                </div>
                <div>
                  <strong>Date:</strong> {booking.bookingDate}
                </div>
                <div>
                  <strong>Hospital:</strong> {booking.dentist.hospital}
                </div>
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
