import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import Room from "./Room";
import { useState } from "react";

const Rooms = () => {
  const axios = useAxios();
  const [sortOrder, seSortOrder] = useState("asc");
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get(`/getRooms?sortOrder=${sortOrder}`);
      return response.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="relative">
        <img
          className="w-full h-[600px] rounded-xl"
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h1 className="text-4xl absolute top-[45%] left-[43%] text-white font-bold  text-center drop-shadow-sm">
          Our Rooms
        </h1>
      </div>
      <div className="container mx-auto my-20">
        <h3 className="text-2xl text-red-600 text-center font-bold">
          ------ Service Since 2010 ------
        </h3>
        <h4 className="text-xl text-gray-600 text-center my-10">
          Our objective at Bluebell is to bring together our visitor societies
          and spirits with our own, communicating enthusiasm <br /> and
          liberality in the food we share. Official Chef and Owner Philippe
          Massoud superbl.
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3 my-20">
        {rooms?.map((room) => (
          <Room key={room._id} data={room}></Room>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
