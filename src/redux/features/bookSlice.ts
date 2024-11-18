import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type BookState={
    bookItems:BookingItem[];
}

const initialState:BookState={bookItems:[]};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const index = state.bookItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        
        state.bookItems[index] = action.payload;
      } else {
       
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookItems = state.bookItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const{addBooking,removeBooking}=bookSlice.actions
export default bookSlice.reducer