import { getSession } from "next-auth/react";
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions'
import { API_URL } from "../config/config";
export default async function loadUsers() {
    const session = await getSession();
  
    if (!session) {
      throw new Error("User is not authenticated.");
    }
  
    try {
      const response = await fetch(`${API_URL}/api/v1/bookings/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
      });
  
      // Handle HTTP errors
      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null); // Try to parse JSON, if any
        const errorMessage =
          errorDetails?.message ||
          `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      // Parse the response and return only the `data` array
      const responseData = await response.json();
      return responseData.data; // Return only the array of users
    } catch (error) {
      console.error("Error loading users:", error.message);
      throw error;
    }
  }
  
  