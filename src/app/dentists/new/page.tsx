"use client";

import { createDentist } from "@/app/api/dentist";
import { CreateDentistDto } from "@/app/api/dto/dentist.dto";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NewDentistPage() {
  const { data: session, status } = useSession();

  const [dentist, setDentist] = useState<CreateDentistDto>({
    name: "",
    hospital: "Chalu Hospital",
    address: "4200 Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 16690",
    expertist: "Dentist",
    tel: "-",
    picture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDentist((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createDentist(dentist, session?.user.token);
    console.log("Dentist Created:", res);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        margin: "0 auto",
        mt: 4,
        mb: 8,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create a Dentist
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={dentist.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Hospital"
        name="hospital"
        value={dentist.hospital}
        onChange={handleChange}
        required
      />
      <TextField
        label="Address"
        name="address"
        value={dentist.address}
        onChange={handleChange}
        multiline
        rows={2}
        required
      />
      <TextField
        label="Expertise"
        name="expertist"
        value={dentist.expertist}
        onChange={handleChange}
      />
      <TextField
        label="Telephone"
        name="tel"
        value={dentist.tel}
        onChange={handleChange}
      />
      <TextField
        label="Picture URL"
        name="picture"
        value={dentist.picture}
        onChange={handleChange}
        required
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
