import Home from "../pages/home/Home";
import MachineCreation from "../pages/MachineCreate/MachineCreation";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import UserVerfication from "../pages/authentication/UserVerfication";
import { PAGE_PATH } from "./Pagepath";
import { Setting } from "../pages/setting/Setting";

export const RouterPath = [
  {
    path: PAGE_PATH.home,
    element: <Home />,
    token: true,
    default: true,
  },
  {
    path: PAGE_PATH.machineCreate,
    element: <MachineCreation />,
    token: true,
  },
  {
    path: PAGE_PATH.setting,
    element: <Setting />,
    token: true,
  },
  {
    path: PAGE_PATH.userVerification,
    element: <UserVerfication />,
    token: false,
  },
  {
    path: PAGE_PATH.login,
    element: <Login />,
    token: false,
    default: true,
  },
  {
    path: PAGE_PATH.signup,
    element: <Signup />,
    token: false,
  },
];
