"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface DateReserveProps {
  selectedDate?: Dayjs | null; // Optional prop to set the initial date
  onDateChange: (date: Dayjs | null) => void; // Callback to handle date changes
}

export default function DateReserve({ selectedDate, onDateChange }: DateReserveProps) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(selectedDate || null);

  // Update the internal state whenever the selectedDate prop changes
  useEffect(() => {
    setReserveDate(selectedDate || null);
  }, [selectedDate]);

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value); // Update internal state
            onDateChange(value); // Trigger parent callback
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
