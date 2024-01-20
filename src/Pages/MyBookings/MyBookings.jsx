import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import BookingCard from "./BookingCard";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyBookings = () => {
  const axios = useAxios();
  const { user } = useAuth();
  // Get My Bookings Data
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
// Update Bookings 
  const handleBookingUpdate = (id, date) => {
   const toastId =  toast.loading("Updating Booking date")
   const bookingDate = date.toDateString()
   const data = {bookingDate}
    axios.patch(`/updateBookingDate/${id}`,data)
    .then(res=>{
      if(res.data.modifiedCount>0){
        toast.success("Booking Date Updated Successfully",{id:toastId})
        refetch()
      }
    })
      document.getElementById("my_modal_1").close()
    
  };
// Submit Review handler
  const handleReview = (id,review,name)=>{
    const toastId = toast.loading("Adding Review")
    const ReviewData ={
      RoomId:id,
      ReviewerEmail:user.email,
      ReviewerPhoto:user.photoURL,
      RoomName:name,
      ReviewDate :new Date().toDateString(),
      ReviewerName:user.displayName,
      Review:review
    }
    axios.post('/addReview',ReviewData)
    .then(res=>{
      if(res.data.insertedId){
        toast.success("Review Added SuccessFully",{id:toastId})
      }
    })
    document.getElementById("my_modal_2").close()
  }

  if (isLoading || isPending ) {
    return (
      <div>
        <span className="loading loading-dots loading-lg h-[70vh] mx-auto flex justify-center items-center "></span>
      </div>
    );
  }
  const handleDelete = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${status ? "Yes, Cancel it!" : "Yes, delete it!"}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/deleteBooking/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            toast.success(
              `${
                status
                  ? "Your Bookings has been Canceled"
                  : "Your Bookings has been deleted"
              }`
            );
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="container mx-auto my-20 min-h-[calc(100vh-561px)]">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        {myBookings?.map((room) => (
          <BookingCard
            refetch={refetch}
            handleBookingUpdate={handleBookingUpdate}
            handleDelete={handleDelete}
            key={room._id}
            room={room}
            handleReview={handleReview}
          ></BookingCard>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
