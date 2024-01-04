const SpecialOffer = () => {
   return (
      <div className="container mx-auto my-20">
         <h1 className="text-4xl font-bold text-center my-20">
            Our Special Offer
         </h1>
         <div className="relative">
            <img
               className="h-[600px] w-full rounded-xl"
               src="https://images.unsplash.com/photo-1521071379542-3b741db9f90b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               alt=""
            />
            <div className="my-auto mx-auto absolute top-[40%] left-[30%] ">
               <h3 className="text-xl text-white  font-bold uppercase">
                  _______ Our Offer
               </h3>
               <h2 className="text-4xl font-extrabold my-5 text-white">
                  Summer Offer
               </h2>
               <p className="text-white">
                  Benefit from a 10% discount, making your reservations with a <br />
                  minimum of 3 days in advance
               </p>
            </div>
         </div>
      </div>
   );
};

export default SpecialOffer;
