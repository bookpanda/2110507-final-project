import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type BookState = {
  bookItems: bookItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<bookItem>) => {
      const index = state.bookItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.bookItems[index] = action.payload;
      } else {
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookItems = state.bookItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
