import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SIgnIn";
import SignUp from "../Pages/SignUp/SIgnUp";
import Rooms from "../Pages/Rooms/Rooms";
import RoomDetails from "../Pages/Rooms/RoomDetails";
import PrivateRoute from "../Auth/PrivateRoute/PrivateRoute";
import MyBookings from "../Pages/MyBookings/MyBookings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/roomDetail/:id",
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
]);

export default routes;
