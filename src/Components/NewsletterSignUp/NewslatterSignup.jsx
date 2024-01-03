const NewsletterSignUp = () => {
   return (
      <div className="container mx-auto">
         <div className="form-control mx-auto w-full max-w-xs mb-5">
         <h2 className="text-xl my-2 font-bold">
         Sign up for our newsletter to receive special offers, news and events.
         </h2>
         <div className="flex">
            <input
               type="email"
               placeholder="Enter email"
               className="input input-bordered w-full max-w-xs"
            />
            <input
               type="submit"
               className="border rounded-r-xl px-4 py-2 bg-slate-700 text-white"
               value="Submit"
            />
         </div>
      </div>
      </div>
   );
};

export default NewsletterSignUp;
