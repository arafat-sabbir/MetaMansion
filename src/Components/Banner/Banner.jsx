// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
   return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
         <SwiperSlide data-hash="slide1">
            <img
               className="w-full h-[600px]"
               src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
               alt=""
            />
         </SwiperSlide>
         <SwiperSlide data-hash="slide2">
            <img
               className="w-full h-[600px]"
               src="https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"
               alt=""
            />
         </SwiperSlide>
         <SwiperSlide data-hash="slide3">
            <img
               className="w-full h-[600px]"
               src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
               alt=""
            />
         </SwiperSlide>
         <SwiperSlide data-hash="slide4">
            <img
               className="w-full h-[600px]"
               src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               alt=""
            />
         </SwiperSlide>
         <SwiperSlide data-hash="slide5">
            <img
               className="w-full h-[600px]"
               src="https://images.pexels.com/photos/3201735/pexels-photo-3201735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
               alt=""
            />
         </SwiperSlide>
      </Swiper>
   );
};

export default Banner;
