"use client";
import { Button } from "@mui/material";
import { FormControl, TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { findAllDentist } from "../api/dentist";
import { Dentist } from "@/types";
import TimeReserve from "@/components/TimeReserve";
import loadUsers from "@/libs/loadUsers";
import getAllBookings from "@/libs/getAllBookings";
import editBooking from "@/libs/editBooking";

export default function ManageBooking() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [dentist, setDentist] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<string>("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>("");

  // Handle booking selection
  const handleBookingSelection = (bookingId: string) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (booking) {
      setSelectedBooking(bookingId);
      setDentist(booking.dentist._id); // Ensure the dentist ID is set
      setUser(booking.user);
      setDate(dayjs(booking.bookingDate));
      setTime(dayjs(booking.bookingDate));
    }
  };

  // Fetch all bookings
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await getAllBookings();
        if (res && res.data) {
          setBookings(res.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Handle updating booking
  const handleUpdateBooking = async () => {
    if (!selectedBooking || !user || !dentist || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    // Combine date and time
    const combinedDateTime = date.hour(time.hour()).minute(time.minute()).second(0);

    try {
      await editBooking(selectedBooking, user, combinedDateTime, dentist);
      alert("Booking updated successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the booking.");
    }
  };

  // Fetch all dentists
  useEffect(() => {
    const fetchDentists = async () => {
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

    fetchDentists();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await loadUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching users");
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">Manage Bookings</div>

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
                {`${booking.dentist.name} - ${dayjs(booking.bookingDate).format("YYYY-MM-DD HH:mm")}`}
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

          <div className="text-md text-left text-gray-600">Assign Dentist</div>
          <Select
            variant="standard"
            value={dentist}
            onChange={(e) => setDentist(e.target.value)}
          >
            {dentists.map((dentist) => (
              <MenuItem key={dentist._id} value={dentist._id}>
                {dentist.name}
              </MenuItem>
            ))}
          </Select>

          <DateReserve
  selectedDate={date} // Pass the selected date
  onDateChange={(value: Dayjs | null) => setDate(value)} // Update handler to accept `Dayjs | null`
/>
<TimeReserve
  selectedTime={time} // Pass the selected time
  onDateChange={(value: Dayjs | null) => setTime(value)} // Update handler to accept `Dayjs | null`
/>

          <Button
            onClick={handleUpdateBooking}
            variant="contained"
            color="primary"
          >
            Update Booking
          </Button>
        </FormControl>
      </div>
    </main>
  );
}
