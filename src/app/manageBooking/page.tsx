"use client";

import { FormControl, TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { findAllDentist } from "../api/dentist";
import { Dentist } from "@/types";
import TimeReserve from "@/components/TimeReserve";
import createBookings from "@/libs/CreateBookings";
import deleteBookings from "@/libs/DeleteBooking";
import loadUsers from "@/libs/loadUsers";
import getAllBookings from "@/libs/getAllBookings";

export default function ManageBooking() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [time2, setTime2] = useState<Dayjs | null>(null);
  const [hospital, setHospital] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>(""); 

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await getAllBookings();
        if (res && res.data) {
          setBookings(res.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while checking available bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await findAllDentist();
        if (!res || !res.data) {
          throw new Error("Failed to fetch dentists");
        }
        setDentists(res.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await loadUsers(); // `loadUsers` already returns parsed JSON
        console.log("Fetched Users:", data);
        setUsers(data); // Use the returned data directly
      } catch (err: any) {
        console.error("Error fetching users:", err.message);
        setError(err.message || "An error occurred while fetching users");
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleBooking = () => {
    if (!hospital || !date || !time || !time2) {
      alert("Please fill all fields.");
      return;
    }

    const dentist = dentists.find((dentist) => dentist._id === hospital);

    if (!dentist) {
      alert("Dentist not found.");
      return;
    }

    // Create 30-minute interval bookings
    const interval = 30; // 30 minutes
    const startTime = time;
    const endTime = time2;

    let current = startTime;
    const bookings = [];

    while (current && endTime && current.isBefore(endTime)) {
        const bookingDateTime = date
          .hour(current.hour()) // Set the hour from the time
          .minute(current.minute()) // Set the minutes from the time
          .second(0); // Ensure seconds are zeroed out if needed
      
        bookings.push({
          dateTime: bookingDateTime.format(),
        });
      
        current = current.add(interval, "minute");
      }


    console.log("Bookings:", bookings);

    // Dispatch each booking
    bookings.forEach((booking) => createBookings(booking.dateTime,hospital));

    alert("Booking successful!");
  };

  const handleBooking2 = () => {
    if (!hospital || !date || !time || !time2) {
      alert("Please fill all fields.");
      return;
    }

    const dentist = dentists.find((dentist) => dentist._id === hospital);

    if (!dentist) {
      alert("Dentist not found.");
      return;
    }

    // Create 30-minute interval bookings
    const interval = 30; // 30 minutes
    const startTime  = date.hour(time.hour()) // Set the hour from the time
     .minute(time.minute()) // Set the minutes from the time
    .second(0);
    const endTime = date.hour(time2.hour()) // Set the hour from the time
    .minute(time2.minute()) // Set the minutes from the time
   .second(0);

    


  deleteBookings(startTime,endTime,hospital);

    alert("Booking successful!");
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">Create New Booking</div>
      <div className="w-fit space-y-2">
        <FormControl variant="standard" className="w-auto space-y-3 bg-gray-100">
          <div className="text-md text-left text-gray-600">Doctor</div>
          <Select
            variant="standard"
            name="hospital"
            id="hospital"
            className="w-auto h-[2em]"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          >
            {dentists.map((dentist: any) => (
              <MenuItem key={dentist._id} value={dentist._id}>
                {dentist._id}
              </MenuItem>
            ))}
          </Select>
          <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          <TimeReserve onDateChange={(value: Dayjs) => setTime(value)} />
          <TimeReserve onDateChange={(value: Dayjs) => setTime2(value)} />
          <button
            name="Book Vaccine"
            onClick={handleBooking}
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
          >
            Book Vaccine
          </button>
        </FormControl>
      </div>
      <div className="w-fit space-y-2">
        <FormControl variant="standard" className="w-auto space-y-3 bg-gray-100">
          <div className="text-md text-left text-gray-600">Doctor</div>
          <Select
            variant="standard"
            name="hospital"
            id="hospital"
            className="w-auto h-[2em]"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          >
            {dentists.map((dentist: any) => (
              <MenuItem key={dentist.id} value={dentist._id}>
                {dentist.name}
              </MenuItem>
            ))}
          </Select>
          <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          <TimeReserve onDateChange={(value: Dayjs) => setTime(value)} />
          <TimeReserve onDateChange={(value: Dayjs) => setTime2(value)} />
            
          <button
            name="Book Vaccine"
            onClick={handleBooking2}
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
          >
            Create Booking
          </button>
          <button
            name="Book Vaccine"
            onClick={handleBooking}
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
          >
            Delete Booking
          </button>
        </FormControl>
      </div>
      <div className="w-fit space-y-2">
      <FormControl variant="standard" className="w-auto space-y-3 bg-gray-100">
        <div className="text-md text-left text-gray-600">Select Booking</div>
        <Select
          variant="standard"
          value={selectedBooking}
          onChange={(e) => handleBookingSelection(e.target.value)}
        >
          {bookings.map((booking) => (
            <MenuItem key={booking._id} value={booking._id}>
              {booking.userName} - {dayjs(booking.bookingDate).format("YYYY-MM-DD HH:mm")}
            </MenuItem>
          ))}
        </Select>

        <div className="text-md text-left text-gray-600">Assign to User</div>
        <Select
          variant="standard"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        <div className="text-md text-left text-gray-600">Hospital</div>
        <Select
          variant="standard"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        >
          {/* Add hospital options here */}
          <MenuItem value="Hospital A">Hospital A</MenuItem>
          <MenuItem value="Hospital B">Hospital B</MenuItem>
        </Select>

        <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
        <TimeReserve onDateChange={(value: Dayjs) => setTime(value)} />
        <TimeReserve onDateChange={(value: Dayjs) => setTime2(value)} />

        <button
          onClick={handleUpdateBooking}
          variant="contained"
          color="primary"
        >
          Update Booking
        </button>
      </FormControl>
    </div>


    </main>
  );
}
