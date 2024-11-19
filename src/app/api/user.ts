import { API_URL } from "@/config/config";
import { User } from "@/types";
import { getSession } from "next-auth/react";

export const getAuthProfile = async (): Promise<User | undefined> => {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to find all dentists: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
