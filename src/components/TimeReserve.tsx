"use client";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface TimeReserveProps {
  selectedTime?: Dayjs | null; // Optional prop to set the initial time
  onDateChange: (time: Dayjs | null) => void; // Callback to handle time changes
}

export default function TimeReserve({ selectedTime, onDateChange }: TimeReserveProps) {
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(selectedTime || null);

  // Sync internal state with the prop whenever it changes
  useEffect(() => {
    setReserveTime(selectedTime || null);
  }, [selectedTime]);

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          className="bg-white"
          value={reserveTime}
          onChange={(value) => {
            setReserveTime(value); // Update internal state
            onDateChange(value); // Trigger parent callback
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
