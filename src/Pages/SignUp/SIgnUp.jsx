import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import useAuth from "../../Utility/Hooks/useAuth/useAuth";
import useAxios from "../../Utility/Hooks/useAxios/useAxios";

const SignUp = () => {
  const navigate = useNavigate();
  const axios = useAxios()
  const location = useLocation();
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
  const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const [photoName, setPhotoName] = useState("");
  const [photo, setPhoto] = useState("");
  const formData = new FormData();
  formData.append("image", photo);
  const handlePhotoUpload = (e) => {
    e.preventDefault();
    setPhotoName(e.target.files[0].name);
    setPhoto(e.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signUpUser, updateUserProfile } = useAuth();

  //   Get the profession from the user

  const onSubmit = async (data) => {
    const toastid = toast.loading("Sign Up Processing");
    const res = await axios.post(imageHostingAPi, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    signUpUser(data.email, data.password)
      .then(() => {
        // update the user profile on firebase with relevant data

        updateUserProfile(data.name, res.data.data.display_url)
          .then(() => {
            const userdata = {
              email: data.email,
              name: data.name,
              photo: res.data.data.display_url,
              creationDate: new Date().toDateString(),
            };

            // if the profile get update successfully Send the data to the server

            axios.post("/createUser", userdata).then((res) => {
              if (res.data.insertedId) {
                toast.success("Sign Up SuccessFully", { id: toastid });
                reset();
                navigate(location.state ? location.state : "/");
              }
            });
          })

            // If any error happen show it to the user

          .catch((error) => {
            toast.error(error);
          });
        console.log(data);
      })

      // If Email is already registered Send A toast to the user

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already Registered", { id: toastid });
        }
      });
  };

  return (
    <div className="bg-cover relative">
      <Link to={"/"}>
        <button className=" text-black font-semibold flex justify-center gap-2  absolute lg:left-96 lg:top-10 top-0">
          {" "}
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>{" "}
          Back To Home
        </button>
      </Link>
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Meta Mansion || Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_20px_] backdrop-blur-sm lg:p-10 my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  name="name"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Photo</span>
                </label>

                <div className="relative w-full">
                  <label className="label absolute -z-50 input pt-2  input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main w-full ">
                    <span className="label-text ">
                      {photoName || "Choose Profile Picture"}
                    </span>
                  </label>
                  <input
                    onChange={handlePhotoUpload}
                    accept="images/*"
                    type="file"
                    placeholder="upload your Photo"
                    name="email"
                    className="input pt-2 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <div>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500" role="alert">
                      Password Should Atleast 6 Character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password Is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500" role="alert">
                      Password Should Contain atleast one Uppercase And One
                      Special Character
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign UP"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Already Have an Account.?
                <Link className=" font-bold text-main ml-1" to={"/signIn"}>
                  SignIn
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
