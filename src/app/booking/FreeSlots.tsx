import { Booking } from "@/types";
import { useEffect, useState } from "react";
import { fetchFreeBookings } from "../api/booking";

export const FreeSlots = () => {
  const [bookingItems, setBookingItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="mb-8 mt-6">
      <h2 className="text-lg font-medium">Existing Bookings</h2>
      {bookingItems.length > 0 ? (
        <div className="mt-4 grid grid-cols-4 gap-4 space-y-2">
          {bookingItems.map((booking: any, index) => (
            <div
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
            </div>
          ))}
        </div>
      ) : (
        <div>
          {loading ? <FreeSlotsSuspense /> : <p>No bookings available.</p>}
        </div>
      )}
    </div>
  );
};

const FreeSlotsSuspense = () => {
  const bookings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-4 gap-4">
      {bookings.map((_) => (
        <div className="h-[90px] w-[20vw] rounded-md border bg-gray-300 p-2 shadow-sm" />
      ))}
    </div>
  );
};
