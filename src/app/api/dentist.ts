import { API_URL } from "@/config/config";
import { Dentist } from "@/types";
import {
  CreateDentistDto,
  FindAllDentistDto,
  FindDentistByIDDto,
  UpdateDentistDto,
} from "./dto/dentist.dto";

export const createDentist = async (
  dentist: CreateDentistDto,
  token: string
): Promise<Dentist | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dentists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dentist),
    });

    if (!response.ok) {
      throw new Error(`Failed to create dentist: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create dentist");
  }
};

export const findAllDentist = async (): Promise<
  FindAllDentistDto | undefined
> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dentists`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to find all dentists: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const findDentistByID = async (
  id: string
): Promise<FindDentistByIDDto | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dentists/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to find dentist by ID: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateDentist = async (
  id: string,
  dentist: UpdateDentistDto,
  token: string
): Promise<Dentist | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dentists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dentist),
    });

    if (!response.ok) {
      throw new Error(`Failed to update dentist: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteDentist = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dentists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete dentist: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
