/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingCard = ({ room, handleDelete,handleBookingUpdate, handleReview }) => {
  const [buttonDisable, setButtonDisabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const DeadlineDate = new Date(room?.bookingDate);
  const today = new Date(Date.now());
  const dayDifferent = Math.floor(
    (DeadlineDate - today) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    if (dayDifferent < 1) {
      setButtonDisabled(true);
    }
  }, [dayDifferent]);

  const [review,setReview] = useState('')
  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="object-cover w-full h-64"
        src={room.room_image}
        alt="Article"
      />

      <div className="p-6">
        <div>
          <h3
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 "
            tabIndex="0"
            role="link"
          >
            {room.room_name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {room.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h1>
              Booked At :{" "}
              <span className="mx-1  text-gray-600 dark:text-gray-300">
                {room.bookingDate}
              </span>
            </h1>
            {/* Update Modal */}
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-[500px] h-[320px] flex relative">
              <div className="">
               New Booking Date :
                <DatePicker
                  className="w-[120px]  py-1 px-3 border rounded-sm border-gray-500"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <button
                onClick={()=>handleBookingUpdate(room._id,startDate)}
                className="btn ml-auto absolute bottom-4 right-4 py-1 px-4 rounded-sm bg-green-600  text-white font-semibold hover:bg-green-600"
              >
                Update Bookings
              </button>
              <button  onClick={() =>
                  document.getElementById("my_modal_1").close()
                } className="btn ml-auto absolute bottom-4 right-44 py-1 px-4 rounded-sm bg-red-600  text-white font-semibold hover:bg-red-600">Cancel</button>
            </div>
          </dialog>
          {/* Review Modal */}
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-[500px] h-[320px] flex relative">
              <div className="">
                <textarea onChange={(e)=>setReview(e.target.value)} cols="30" className="p-4 placeholder:font-semibold border-2" placeholder="Your Review" rows="5"></textarea>
              </div>
              <button
                onClick={()=>handleReview(room._id,review)}
                className="btn ml-auto absolute bottom-4 right-4 py-1 px-4 rounded-sm bg-green-600  text-white font-semibold hover:bg-green-600"
              >
                Submit Review
              </button>
              <button  onClick={() =>
                  document.getElementById("my_modal_2").close()
                } className="btn ml-auto absolute bottom-4 right-44 py-1 px-4 rounded-sm bg-red-600  text-white font-semibold hover:bg-red-600">Cancel</button>
            </div>
          </dialog>
            <div className="flex gap-2">
              <button onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="py-1 px-4 rounded-sm bg-green-600  text-white font-semibold"
              >
                Update
              </button>
              {/* Cancel Button */}
             {
               buttonDisable? <button
                 className="py-1 px-4 rounded-sm bg-gray-100 disabled text-gray-400 cursor-not-allowed font-semibold"
               >
                 Cancel
               </button>: <button
              onClick={()=>handleDelete(room._id,"cancel")}
                className="py-1 px-4 rounded-sm bg-green-600  text-white font-semibold"
              >
                Cancel
              </button>
             }
             {/* Review Button */}
              <button
              onClick={()=> document.getElementById("my_modal_2").showModal()}
                className="py-1 px-4 rounded-sm bg-slate-600  text-white font-semibold "
              >
                Review
              </button>
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(room._id)}
                className="py-1 px-4 rounded-sm bg-main  text-white font-semibold "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
