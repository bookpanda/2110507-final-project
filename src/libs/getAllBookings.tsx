import { getSession } from "next-auth/react";
import { API_URL } from "@/config/config";

export default async function getAllBookings() {
  // Check if the user is authenticated
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated.");
  }

  try {
    // Fetch all bookings from the API
    const response = await fetch(`${API_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    // Handle non-successful responses
    if (!response.ok) {
      // Try to parse error details if available
      const errorDetails = await response.json().catch(() => null);
      const errorMessage =
        errorDetails?.message ||
        `Failed to fetch bookings. Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error: unknown) { // Use `unknown` to ensure proper type safety
    if (error instanceof Error) {
      // If the error is an instance of the built-in Error class
      console.error("Error fetching bookings:", error.message);
    } else {
      // Handle other unexpected error types
      console.error("Unexpected error fetching bookings:", error);
    }
    throw error; // Re-throw the error to propagate it
  }
}
