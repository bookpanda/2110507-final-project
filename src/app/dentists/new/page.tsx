"use client";

import { createDentist } from "@/app/api/dentist";
import { CreateDentistDto } from "@/app/api/dto/dentist.dto";
import { Button } from "@/components/Button";
import { Box, TextField, Typography } from "@mui/material";
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
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDentist((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Dentist:", dentist);
    e.preventDefault();
    try {
      const res = await createDentist(dentist, session?.user.token);
      console.log("Dentist Created:", res);
    } catch (error: any) {
      setError(error.message);
    }
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
      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}
      <Typography variant="h4" align="center" gutterBottom>
        Create a Dentist
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={dentist.name}
        onChange={handleChange}
        required
        data-testid="name"
      />
      <TextField
        label="Hospital"
        name="hospital"
        value={dentist.hospital}
        onChange={handleChange}
        required
        data-testid="hospital"
      />
      <TextField
        label="Address"
        name="address"
        value={dentist.address}
        onChange={handleChange}
        required
        data-testid="address"
      />
      <TextField
        label="Expertise"
        name="expertist"
        value={dentist.expertist}
        onChange={handleChange}
        required
        data-testid="expertise"
      />
      <TextField
        label="Telephone"
        name="tel"
        value={dentist.tel}
        onChange={handleChange}
        required
        data-testid="tel"
      />
      <TextField
        label="Picture URL"
        name="picture"
        value={dentist.picture}
        onChange={handleChange}
        required
        data-testid="picture"
      />
      {/* <Button variant="contained" type="submit">
        Submit
      </Button> */}
      <Button text="Submit" variant="primary" type="submit" />
    </Box>
  );
}
