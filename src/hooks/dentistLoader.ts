import { findAllDentist } from "@/app/api/dentist";

export const dentistLoader = async () => {
  try {
    const res = await findAllDentist();

    // Validate that `res` exists and has the expected `data` property
    if (!res || !res.data) {
      throw new Error("Invalid response from the server");
    }

    return res.data; // Return the dentist data
  } catch (error) {
    console.error("Error loading dentist data:", error.message || error);
    throw new Error("Failed to load dentist data");
  }
};
