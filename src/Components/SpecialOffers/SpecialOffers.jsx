const SpecialOffers = () => {
   return (
      <div className="container mx-auto">
         <h1 className="text-4xl font-bold text-center my-5">
            Our Special Offer
         </h1>
         <div className="flex">
            <div>
               <img
                  className=""
                  src="https://kitpapa.net/iresort/wp-content/uploads/2023/07/image-7.jpg"
                  alt=""
               />
               <img
                  className="relative bottom-40 left-40 border-8 border-white"
                  src="https://kitpapa.net/iresort/wp-content/uploads/2023/07/image-36.jpg"
                  alt=""
               />
            </div>
            <div className="my-auto mx-auto">
               <h3 className="text-xl text-red-600 font-bold uppercase">
                  _______ Eat & Drink
               </h3>
               <h2 className="text-4xl font-extrabold my-5">
                  Indulge in exceptional <br /> & Local Foodies
               </h2>
               <h2 className="text-2xl font-bold my-5">
                  There will be 30% discount every Sunday
               </h2>
            </div>
         </div>
      </div>
   );
};

export default SpecialOffers;
