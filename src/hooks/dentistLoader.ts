import { findAllDentist } from "@/app/api/dentist";

export const dentistLoader = async () => {
  try {
    const res = await findAllDentist();

    // Validate that `res` exists and has the expected `data` property
    if (!res || !res.data) {
      throw new Error("Invalid response from the server");
    }

    return res.data; // Return the dentist data
  }catch (error) {
    // Log the error and rethrow
    if (error instanceof Error) {
      console.error("Error deleting booking:", error.message);  // Accessing .message safely
    } else {
      // If error is not an instance of Error, it could be any other type (e.g., string)
      console.error("An unknown error occurred while deleting the booking:", error);
    }
  }
};
