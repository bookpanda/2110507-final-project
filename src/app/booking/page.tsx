"use client";

import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { findAllDentist } from "../api/dentist";
import { fetchBookings, fetchFBookings} from "../api/booking";
import makeBooking from "@/libs/makeBookings";
import TimeReserve from "@/components/TimeReserve";
import removeBooking from "../../libs/removeBooking";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
export default function Booking() {
  const [dentists, setDentists] =  useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [timeOptions, setTimeOptions] = useState<{ time: string; dentistId: string }[]>([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [dentist, setDentist] = useState("");
  const [ok, setOk] = useState(true);
  const [userBooking, setUserBooking] = useState<any>(null);

  useEffect(() => {
    const fetchDentistsData = async () => {
      try {
        const res = await findAllDentist();
        if (!res || !res.data) {
          throw new Error("Failed to fetch dentists");
        }
        setDentists(res.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching dentists");
      } finally {
        setLoading(false);
      }
    };

    fetchDentistsData();
  }, []);

  useEffect(() => {
    const checkFBookings = async () => {
      try {
        const res = await fetchFBookings("");
        if (res && res.data) {
          setFilteredBookings(res.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while checking available bookings");
      } finally {
        setLoading(false);
      }
    };

    checkFBookings();
  }, []);

  useEffect(() => {
    const checkBookings = async () => {
      try {
        const res = await fetchBookings("");
        if (res && res.data && res.data.length > 0) {
          setOk(false); // User already has a booking
          setUserBooking(res.data[0]); // Assuming only one booking per user
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while checking bookings");
      } finally {
        setLoading(false);
      }
    };

    checkBookings();
  }, []);

  useEffect(() => {
    // Update available times based on `filteredBookings`, selected date, and dentist
    if (date && dentist) {
      const availableTimes = filteredBookings
        .filter(
          (booking: any) =>
            dayjs(booking.bookingDate).isSame(date, "day") &&
            booking.dentist._id === dentist
        )
        .map((booking: any) => ({
          time: dayjs(booking.bookingDate).format("HH:mm"),
          dentistId: booking._id,
        }))
        .sort((a, b) => (a.time > b.time ? 1 : -1)); // Sort times in ascending order
      setTimeOptions(availableTimes);
    } else {
      setTimeOptions([]); // Reset if date or dentist is not selected
    }
  }, [date, dentist, filteredBookings]);
  

  const makeBookings = () => {
    if (!dentist || !date || !time) {
      window.alert("Please fill all fields, select a date, and choose a time!");
      return;
    }

    const booking = {
      
    };
    makeBooking(time)

    console.log("Booking Data:", booking);
    window.alert("Booking successful!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 space-y-6">
  {ok ? (
    <>
      <div className="text-lg sm:text-xl font-medium text-center">New Reservation</div>
      <div className="w-full max-w-md space-y-4">
        <FormControl variant="standard" className="w-full space-y-3 bg-gray-100 p-4 rounded-md">
          <div className="text-md sm:text-lg text-gray-600">Dentist</div>
          <Select
            variant="standard"
            name="dentist"
            value={dentist}
            onChange={(e) => setDentist(e.target.value)}
          >
            {dentists.length > 0 ? (
              dentists.map((dentist: any) => (
                <MenuItem key={dentist.id} value={dentist._id}>
                  {dentist.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No dentists available</MenuItem>
            )}
          </Select>
          <DateReserve
            onDateChange={(value: Dayjs | null) => setDate(value)}
            selectedDate={date}
          />
          <Select
            variant="standard"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {timeOptions.length > 0 ? (
              timeOptions.map((option, index) => (
                <MenuItem key={index} value={option.dentistId}>
                  {option.time}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No times available</MenuItem>
            )}
          </Select>
          <button
            onClick={async () => {
              try {
                if (!dentist || !date || !time) {
                  window.alert("Please fill all fields, select a date, and choose a time!");
                  return;
                }
                await makeBooking(time);
                window.location.reload();
              } catch (error) {
                console.error("Error making booking:", error);
                alert("An error occurred while making your booking.");
              }
            }}
            className="w-full rounded-md bg-sky-600 hover:bg-indigo-600 px-4 py-2 text-white"
          >
            Book Now
          </button>
        </FormControl>
      </div>
    </>
  ) : (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 space-y-6">
      <div className="text-lg sm:text-xl font-medium text-center">Update Reservation</div>
      <div className="w-full max-w-md space-y-4">
        <FormControl variant="standard" className="w-full space-y-3 bg-gray-100 p-4 rounded-md">
          <div className="text-md sm:text-lg text-gray-600">Dentist</div>
          <Select
            variant="standard"
            name="dentist"
            value={dentist}
            onChange={(e) => setDentist(e.target.value)}
          >
            {dentists.length > 0 ? (
              dentists.map((dentist: any) => (
                <MenuItem key={dentist.id} value={dentist._id}>
                  {dentist.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No dentists available</MenuItem>
            )}
          </Select>
          <DateReserve
            onDateChange={(value: Dayjs | null) => setDate(value)}
            selectedDate={date}
          />
          <Select
            variant="standard"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {timeOptions.length > 0 ? (
              timeOptions.map((option, index) => (
                <MenuItem key={index} value={option.dentistId}>
                  {option.time}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No times available</MenuItem>
            )}
          </Select>
          <button
  onClick={async () => {
    try {if (!dentist || !date || !time) {
      window.alert("Please fill all fields, select a date, and choose a time!");
      return;
    }
      if (userBooking && userBooking._id) {
        await removeBooking(userBooking._id); // Wait for the booking to be removed
      }
      await makeBooking(time); // Wait for the new booking to be created
      window.location.reload(); // Reload the page after both operations succeed
    } catch (error) {
      console.error("Error during booking operation:", error);
      alert("An error occurred while updating your booking.");
    }
  }}
  className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
>
  Update Booking
</button>
        </FormControl>
      </div>
      <div className="text-lg sm:text-xl font-medium text-center">Your Current Booking</div>
      <div className="bg-slate-200 rounded px-5 py-4 w-full max-w-md text-center">
        <div className="text-lg sm:text-xl text-black">
          Date: {dayjs(userBooking.bookingDate).format("YYYY-MM-DD")}
        </div>
        <div className="text-lg sm:text-xl text-black">
          Time: {dayjs(userBooking.bookingDate).format("HH:mm")}
        </div>
        <div className="text-lg sm:text-xl text-black">Dentist: {userBooking.dentist.name}</div>
        <div className="text-lg sm:text-xl text-black">Hospital: {userBooking.dentist.hospital}</div>
        <button
  className="w-full rounded-md bg-red-600 hover:bg-red-700 px-4 py-2 mt-4 text-white"
  onClick={async () => {
    try {
      await removeBooking(userBooking._id); // Wait for the booking to be removed
      window.location.reload(); // Reload the page after the operation succeeds
    } catch (error) {
      console.error("Error removing booking:", error);
      alert("An error occurred while removing your booking.");
    }
  }}
>
  Cancel Booking
</button>
      </div>
      <div className="text-md sm:text-lg text-red-500 text-center">
        You already have a reservation!
      </div>
    </div>
  )}
</main>
  );
}
