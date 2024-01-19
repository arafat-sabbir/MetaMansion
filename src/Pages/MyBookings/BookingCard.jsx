/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const BookingCard = ({ room }) => {
   const [buttonDisable, setButtonDisabled] = useState(false);
   const DeadlineDate = new Date(room?.bookingDate);
   const today = new Date(Date.now());
   const dayDifferent = Math.floor(
      (DeadlineDate - today) / (1000 * 60 * 60 * 24)
   );

   const handleDelete = (_id) => {
      fetch(`http://localhost:5001/users/${_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
         });
   };
   useEffect(() => {
      if (dayDifferent < 1) {
         setButtonDisabled(true);
      }
   }, [dayDifferent]);
   console.log(buttonDisable);
   return (
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
         <img
            className="object-cover w-full h-64"
            src={room.room_image}
            alt="Article"
         />

         <div className="p-6">
            <div>
               <a
                  href="#"
                  className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                  tabIndex="0"
                  role="link"
               >
                  {room.room_name}
               </a>
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
                  <div className="flex gap-2">
                     <button
                        onClick={() => handleDelete(room._id)}
                        disabled={buttonDisable}
                        className={`${
                           buttonDisable
                              ? "py-1 px-4 rounded-sm bg-gray-300  text-white font-semibold !cursor-not-allowed"
                              : "py-1 px-4 rounded-sm bg-main  text-white font-semibold "
                        } `}
                     >
                        delete
                     </button>
                     <button className="py-1 px-4 rounded-sm bg-green-600  text-white font-semibold">
                        update
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BookingCard;
