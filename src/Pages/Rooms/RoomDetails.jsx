import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
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
  console.log(room);
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
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
