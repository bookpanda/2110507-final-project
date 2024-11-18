"use client";
import { removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function BookingList() {
  const bookingItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>  <div className="text-xl flex justify-center items-center">การจองวัคซีน</div>
      {bookingItems.length === 0 ? (
        <div className="text-xl flex justify-center items-center">No Vaccine Booking</div>
      ) : (
        bookingItems.map((bookItem) => (
          <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookItem._id}>
            <div className="text-xl text-black">
        
            </div>
            <div className="text-xl text-black">รหัสประจำตัวประชาชน: </div>
            <div className="text-xl text-black">โรงพยาบาล:</div>
            <div className="text-xl text-black">วันที่ต้องการรับวัคซีน: {bookItem.bookDate}</div>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
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
