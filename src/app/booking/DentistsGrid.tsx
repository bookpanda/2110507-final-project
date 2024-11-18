
import { findAllDentist } from "@/app/api/dentist";
import { CgInfo } from "react-icons/cg";
import { FormControl, Select, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DateReserve from "@/components/DateReserve";

// Define a Dentist type for TypeScript
interface Dentist {
  _id: string;
  name: string;
  hospital: string;
  expertist: string;
  picture: string;
}

export const DentistsGrid = async () => {
    const res = await findAllDentist();
    if (!res) {
      return <div>Failed to fetch dentists</div>;
    }
    const dentists = res.data;
  

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Dropdown for selecting a hospital */}
      <FormControl fullWidth className="col-span-3 mb-4">
        <Select defaultValue="" displayEmpty>
          <MenuItem value="" disabled>
            Select a Dentist
          </MenuItem>
          {dentists.map((dentist) => (
            <MenuItem key={dentist.hospital} value={dentist.hospital}>
              {dentist.name}
            </MenuItem>
          ))}
        </Select>
        <DateReserve></DateReserve>
      </FormControl>
  
   
    </div>
  );
};

export const DentistsGridSuspense: React.FC = () => {
  const placeholders = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="grid grid-cols-3 gap-4">
      {placeholders.map((key) => (
        <div key={key} className="flex h-[35vh] flex-col items-center">
          <div className="h-[150px] w-[150px] rounded-full bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
