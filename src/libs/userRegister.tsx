import { API_URL } from "@/config/config";

export default async function userRegister(name: string, email: string, tel: string, role: string, password: string) {
    // Create the request body object
    const requestBody = {
        name: name,
        email: email,
        tel: tel,
        role: role,
        password: password,
        createdAt: "2023-08-20",
    };

    // Log the body to the console (for debugging)
    console.log("Request Body:", JSON.stringify(requestBody));

    // Send the request to the server
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
