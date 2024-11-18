import { API_URL } from "@/config/config";
import { getSession } from "next-auth/react";

// Remove booking function
export default async function removeBooking(bookingid: string) {
  // Retrieve the session (client-side session)
  const session = await getSession();
  
  // Check if session exists and if it contains the necessary token
  if (!session || !session.user?.token) {
    console.error("No session or token found");
    return null;  // Or handle the failure as needed (e.g., show an error message)
  }

  // If session is invalid, throw an error
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    // Send DELETE request to backend API
    const response = await fetch(`${API_URL}/api/v1/bookings/${bookingid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,  // Use the token from the session
      },
    });

    // Check if response is OK (status code 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete booking");
    }

    // Parse the response body
    const result = await response.json();
    console.log("Booking deleted:", result.data);

    // Return the result data (or handle it as needed)
    return result.data;
  }  catch (error) {
    // Log the error and rethrow
    if (error instanceof Error) {
      console.error("Error deleting booking:", error.message);  // Accessing .message safely
    } else {
      // If error is not an instance of Error, it could be any other type (e.g., string)
      console.error("An unknown error occurred while deleting the booking:", error);
    }
  }
}
