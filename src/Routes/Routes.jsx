import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SIgnIn";
import SignUp from "../Pages/SignUp/SIgnUp";
import Rooms from "../Pages/Rooms/Rooms";

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
        path: '/rooms',
        element: <Rooms></Rooms>
      }
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
