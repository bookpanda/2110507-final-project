import { API_URL } from "@/config/config";
import { User } from "@/types";

export const getAuthProfile = async (
  token: string
): Promise<User | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
