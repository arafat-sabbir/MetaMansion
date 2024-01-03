import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { IoReturnUpBack } from "react-icons/io5";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const onSubmit = (data) => {
    const toastid = toast.loading("Sign In Processing");
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success("Sign In SuccessFull", { id: toastid });
        navigate(location.state ? location.state : "/");
        console.log(res);
      })
      .catch((error) => {
      if(error.message){
        toast.error("Invalid Email And Password",{id:toastid})
      }
      });
  };
  return (
    <div className="bg-cover relative  "
     
    >
        <Link to={'/'}>
       <button className=" text-black font-semibold flex justify-center gap-2  absolute lg:left-96 lg:top-10 top-4 left-2"> <span className="text-2xl"><IoReturnUpBack/></span> Back To Home</button>
       </Link>
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
      <Helmet>
        <title>Task Vault || Sign In</title>
      </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_20px_] backdrop-blur-sm lg:p-10 lg:my-10 bg-transparent">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                  })}
                />
                <div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password Is required
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign In"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Do not have a account.?
                <Link className=" font-bold text-main ml-1" to={"/signUp"}>
                  SignUp
                </Link>
              </p>
            </form>
            <div className="w-3/4 mx-auto">
             Btaldfjk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;