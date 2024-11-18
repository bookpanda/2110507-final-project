import { useSession, getSession } from "next-auth/react";
import {FormControl,TextField,Select,MenuItem} from '@mui/material';
import DateReserve from '@/components/DateReserve';
import { authOptions } from './auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import getUserProfile from "@/libs/getUserProfile";
import { API_URL } from "@/config/config";


export const fetchBookings = async (dentistId: string): Promise<any> => {
  const query = dentistId ? `?dentistId=${dentistId}` : '';
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {

    const response = await fetch(`${API_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch free bookings");
    }

    return response.json();
  } catch (error: any) {
    console.error("Error fetching free bookings:", error.message);
    throw error;
  }
};



