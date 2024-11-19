"use client";

import { AppDispatch } from "@/store/store";
import { Booking } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBookings } from "../api/booking";
import removeBooking from "./removeBooking";

const BookingsPage = () => {
  const [bookingItems, setBookingItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchBookings("");
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

  if (loading)
    return <div className="mt-[10vh] h-[80vh] px-[10vw]">Loading...</div>;
  if (error)
    return <div className="mt-[10vh] h-[80vh] px-[10vw]">Error: {error}</div>;

  return (
    <main className="mt-[10vh] h-[80vh] px-[10vw]">
      {bookingItems.length === 0 && <div>There are no bookings.</div>}
      {bookingItems.map((bookItem: any) => (
        <div
          className="mx-5 my-2 rounded bg-slate-200 px-5 py-2"
          key={bookItem.id}
        >
          <div className="text-xl text-black">
            Date: {bookItem._id} {bookItem.bookingDate}
          </div>
          <div className="text-xl text-black">หมอ: {bookItem.dentist.name}</div>
          <div className="text-xl text-black">
            Hospital: {bookItem.dentist.hospital}
          </div>
          <button
            className="block rounded-md bg-sky-600 px-3 py-1 text-white shadow-sm hover:bg-indigo-600"
            onClick={() => removeBooking(bookItem._id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </main>
  );
};

export default BookingsPage;
