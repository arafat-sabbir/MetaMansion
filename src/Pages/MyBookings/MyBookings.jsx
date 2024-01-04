import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import BookingCard from "./BookingCard";
import Swal from "sweetalert2";

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
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/deleteBooking/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="container mx-auto my-20">
     <div className="grid grid-cols-1 lg:grid-cols-2">
     {myBookings?.map((room) => <BookingCard handleDelete={handleDelete} key={room._id} room={room}></BookingCard>)}
     </div>
    </div>
  );
};

export default MyBookings;
