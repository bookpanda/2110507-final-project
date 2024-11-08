import { Dentist } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    addDentist: (state, action: PayloadAction<Dentist>) => {
      state.dentists.push(action.payload);
    },
    addDentists: (state, action: PayloadAction<Dentist[]>) => {
      state.dentists.push(...action.payload);
    },
  },
});

export const { addDentist, addDentists } = dentistSlice.actions;
export const selectDentists = (state: RootState) =>
  state.dentistReducer.dentists;

export default dentistSlice.reducer;
