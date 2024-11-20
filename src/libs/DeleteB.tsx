import { getSession } from "next-auth/react";
import { API_URL } from "@/config/config";
import dayjs, { Dayjs } from "dayjs";

export default async function deleteB(bookingId: string) {
  try {
    // Fetch the current session
    const session = await getSession();
    if (!session) {
      throw new Error("User is not authenticated.");
    }

    // Log session details for debugging
    console.log("Session Details:", session);

 
   

    // Send the request to the server
    const response = await fetch(`${API_URL}/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`, // Assuming session includes `token`
      },
     
    });

    // Log the raw response status and headers
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    // Log the raw response text
    const responseText = await response.text();
    console.log("Raw Response Text:", responseText);

    // Check for a successful response
    if (!response.ok) {
      let errorResponse;
      try {
        errorResponse = JSON.parse(responseText);
      } catch {
        errorResponse = { message: responseText }; // If not JSON, use raw text
      }
      throw new Error(
        errorResponse?.message || "Failed to create booking. Please try again."
      );
    }

    // Parse and return the JSON response from the server
    const responseData = JSON.parse(responseText);
    console.log("Parsed Response Data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error in createBookings:", error);
    throw error;
  }
}
