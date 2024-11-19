"use client";
import { removeBooking } from "@/store/bookSlice";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";

export default function BookingList() {
  const bookingItems = useAppSelector((state) => state.bookReducer.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {" "}
      <div className="flex items-center justify-center text-xl">
        การจองวัคซีน
      </div>
      {bookingItems.length === 0 ? (
        <div className="flex items-center justify-center text-xl">
          No Vaccine Booking
        </div>
      ) : (
        bookingItems.map((bookItem) => (
          <div
            className="mx-5 my-2 rounded bg-slate-200 px-5 py-2"
            key={bookItem._id}
          >
            <div className="text-xl text-black"></div>
            <div className="text-xl text-black">รหัสประจำตัวประชาชน: </div>
            <div className="text-xl text-black">โรงพยาบาล:</div>
            <div className="text-xl text-black">
              วันที่ต้องการรับวัคซีน: {bookItem.bookDate}
            </div>
            <button
              className="block rounded-md bg-sky-600 px-3 py-1 text-white shadow-sm hover:bg-indigo-600"
              onClick={() => dispatch(removeBooking(bookItem._id))}
            >
              Remove Booking
            </button>
          </div>
        ))
      )}
    </>
  );
}
