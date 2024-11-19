import { getSession } from "next-auth/react";
import { FindAllBookingDto } from "./dto/booking.dto";

export const fetchBookings = async (
  dentistId: string
): Promise<FindAllBookingDto> => {
  const query = dentistId ? `?dentistId=${dentistId}` : "";
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await fetch(
      `https://final-project-backend-mocha.vercel.app/api/v1/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch free bookings");
    }

    return response.json();
  } catch (error: any) {
    console.error("Error fetching free bookings:", error.message);
    throw error;
  }
};

export const fetchFreeBookings = async (
  dentistId: string
): Promise<FindAllBookingDto> => {
  const query = dentistId ? `?dentistId=${dentistId}` : "";
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await fetch(
      `https://final-project-backend-mocha.vercel.app/api/v1/bookings/free`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch free bookings");
    }

    return response.json();
  } catch (error: any) {
    console.error("Error fetching free bookings:", error.message);
    throw error;
  }
};
