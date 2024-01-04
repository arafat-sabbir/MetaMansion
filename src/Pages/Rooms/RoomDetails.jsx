import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";

const RoomDetails = () => {
<<<<<<< HEAD
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
  const handleRoomBooking = (id)=>{
    console.log(id);
  }
  
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
              <button onClick={()=>handleRoomBooking(room._id)} className="py-2 px-3 rounded-xm bg-black border-b-4 border-b-main text-white">Book Now</button>
              </div>
          }
        </div>
=======
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
   console.log(room);
   return (
      <div className="container mx-auto my-16">
         <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
               <img src={room.room_image} alt="Album" />
            </figure>
            <div className="card-body">
               <h2 className="card-title">{room.room_name}</h2>
               <p>{room.description}</p>
               
            </div>
         </div>
>>>>>>> 31b340fd323bfd572f380b5137ef4fd6a37819c0
      </div>
   );
};

export default RoomDetails;
