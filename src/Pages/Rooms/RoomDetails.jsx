import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";

const RoomDetails = () => {
  const { id } = useParams();
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
  const 
  
  return (
    <div className="container mx-auto my-16">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={room.room_image}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{room.room_name}</h2>
          <p>{room.description}</p>
          <p> Price Per Night : ${room.price_per_night}</p>
          <p>Room Size : {room.room_size}</p>
          <p>Availability : <span className="uppercase">{room.availability}</span></p>
          {
            room.availability==="available"&&<div>
              <button className="py-2 px-3 rounded-xm bg-black border-b-4 border-b-main text-white">Book Now</button>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
