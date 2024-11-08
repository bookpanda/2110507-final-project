import { Dentist } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DentistState {
  dentists: Dentist[];
}

const initialState: DentistState = {
  dentists: [],
};

export const dentistSlice = createSlice({
  name: "dentist",
  initialState,
  reducers: {},
});

export const selectDentists = (state: RootState) =>
  state.dentistReducer.dentists;

export default dentistSlice.reducer;
