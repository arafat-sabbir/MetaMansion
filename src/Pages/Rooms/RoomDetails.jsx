import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axios = useAxios();
  const {
    data: room = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get(`/getRoomDetails/${id}`);
      return response.data;
    },
  });
  const handleRoomBooking = (id) => {
    const toastId = toast.loading("Booking Room...");
    const roomData = {
      description: room.description,
      roomId: id,
      room_image: room.room_image,
      room_name: room.room_name,
      price_per_night: room.price_per_night,
      room_size: room.room_size,
      userEmail: user.email,
      bookingDate: new Date().toDateString(),
    };
    axios.post("/bookRoom", roomData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Room Booked Successfully", { id: toastId });
        axios.patch(`/makeUnavailable/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        });
      }
    });
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
            Availability :{" "}
            <span className="uppercase">{room.availability}</span>
          </p>
          {room.availability === "available" && (
            <div>
              <button
                onClick={() => handleRoomBooking(room._id)}
                className="py-2 px-3 rounded-xm bg-black border-b-4 border-b-main text-white"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
