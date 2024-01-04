import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const {
    data: myBookings,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const response = await axios.get(`/getMyBookings?email=${user.email}`);
      return response.data;
    },
  });
 
  if (isLoading || isPending || !myBookings.length) {
    return (
      <div>
        <span className="loading loading-dots loading-lg h-[70vh] mx-auto flex justify-center items-center "></span>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-20">
     <div className="grid grid-cols-1 lg:grid-cols-2">
     {myBookings?.map((room) => <BookingCard key={room._id} room={room}></BookingCard>)}
     </div>
    </div>
  );
};

export default MyBookings;
