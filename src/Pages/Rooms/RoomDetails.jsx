import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axios = useAxios();
  const {
    data: review,
    isLoading,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(`/getReview/${id}`);
      return res.data;
    },
  });
  console.log(isLoading, review, isPending);

  const { data: room = [], refetch } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get(`/getRoomDetails/${id}`);
      return response.data;
    },
  });
  const [startDate, setStartDate] = useState(new Date());
  const handleRoomBooking = async (id) => {
    const toastId = toast.loading("Booking Room...");
    const roomData = {
      description: room.description,
      roomId: id,
      room_image: room.room_image,
      room_name: room.room_name,
      price_per_night: room.price_per_night,
      room_size: room.room_size,
      userEmail: user.email,
      bookingDate: startDate.toDateString(),
    };
    console.log(roomData);
    await axios.post("/bookRoom", roomData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Room Booked Successfully", { id: toastId });
        axios.patch(`/makeUnavailable/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        });
      }
    });
    document.getElementById("my_modal_1").close();
  };

  return (
    <div className="container mx-auto my-16">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={room.room_image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{room.room_name}</h2>
          <p>{room.description}</p>
          <p> Price Per Night : ${room.price_per_night}</p>
          <p>Room Size : {room.room_size}</p>
          <p>
            Availability :<span className="uppercase">{room.availability}</span>
          </p>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-[500px] h-[320px] flex relative">
              <div className="">
                Booking Date :
                <DatePicker
                  className="w-[120px]  py-1 px-3 border rounded-sm border-gray-500"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <button
                onClick={() => handleRoomBooking(room._id)}
                className="btn ml-auto absolute bottom-4 right-4 py-1 px-4 rounded-sm bg-green-600  text-white font-semibold hover:bg-green-600"
              >
                Book Now
              </button>
            </div>
          </dialog>
          {room.availability === "available" && (
            <div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="py-2 px-3 rounded-xm bg-black border-b-4 border-b-main text-white"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Review Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 justify-center items-center ">
        {review?.map((room, index) => (
          <div key={index}>
            <div className="w-full relative min-h-[200px] max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-[0_0_70px_#D3D6D9] dark:bg-gray-800">
              <div className="flex justify-center -mt-16 md:justify-end">
                <img
                  className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                  alt="Testimonial avatar"
                  src={room?.ReviewerPhoto}
                />
              </div>

              <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                {room.RoomName}
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                {room.Review}
              </p>

              <div className="flex justify-end mt-4">
                <p className="text-lg absolute bottom-4 right-4 font-medium text-blue-600 dark:text-blue-300">
                  Reviewer : {room.ReviewerName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDetails;
