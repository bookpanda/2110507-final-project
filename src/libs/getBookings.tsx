import { getServerSession } from "next-auth";
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions'
import { API_URL } from "@/config/config";
export default async function getBookings(dentistId:string) {
    // Create the request body object
    const session= await getServerSession(authOptions)
    const requestBody = {
        dentistId:dentistId
    }
   
    // Log the body to the console (for debugging)
    console.log("Request Body:", JSON.stringify(requestBody));

    // Send the request to the server
    const response = await fetch(`${API_URL}/api/v1/bookings/free`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(requestBody),
    });

    // Check for a successful response
    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    // Parse and return the JSON response from the server
    return await response.json();
}
