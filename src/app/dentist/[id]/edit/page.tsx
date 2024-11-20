"use client";

import {
  deleteDentist,
  findDentistByID,
  updateDentist,
} from "@/app/api/dentist";
import { CreateDentistDto } from "@/app/api/dto/dentist.dto";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DentistPageProps {
  params: {
    id: string;
  };
}

export default function EditDentistPage({ params }: DentistPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dentist, setDentist] = useState<CreateDentistDto>({
    name: "",
    hospital: "",
    address: "",
    expertist: "",
    tel: "",
    picture: "",
  });

  useEffect(() => {
    const getDentist = async () => {
      try {
        const res = await findDentistByID(params.id);
        if (!res || !res.data) {
          throw new Error("Failed to fetch dentist");
        }
        setDentist(res.data);
        console.log(res.data);
      } catch (err: any) {
        console.error(err.message || "An error occurred");
      }
    };

    getDentist();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDentist((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateDentist(params.id, dentist, session?.user.token);
    console.log("Dentist updated:", res);
    router.push("/dentists");
  };

  const handleDelete = async (e: React.FormEvent) => {
    const res = await deleteDentist(params.id, session?.user.token);
    console.log("Dentist Deleted:", res);
    router.push("/dentists");
  };

  return (
    <Box
      component="form"
      onSubmit={handleUpdate}
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
        Edit a Dentist
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
      <Button variant="contained" type="submit">
        Update Dentist
      </Button>
      <Button variant="contained" onClick={handleOpen} color="error">
        Delete Dentist
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Dentist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this dentist? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
