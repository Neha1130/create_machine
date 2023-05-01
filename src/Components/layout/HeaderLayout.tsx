import { FunctionComponent } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogOut } from "../../store/reducers/AuthuserSlice";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";
const HeaderLayout: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userInfo = useAppSelector((state) => state.authuser?.userInfo);
  const navigate = useNavigate()
  return (
    <div className="flex justify-between bg-gray-800 h-14">
      <div>
        <img src="" alt="" />
      </div>
      <div className="flex justify-between mr-10 mt-4 space-x-4">
        <div className="">
          <p className="text-white">
            {userInfo && userInfo.firstName + " " + userInfo?.lastName}
          </p>
        </div>
        <div className="relative user-icon">
          <FaUserCircle size={24} className="text-white cursor-pointerx" />
          <div className="bg-gray-200 rounded-md p-3 absolute top-[40px] right-[-38px] user-icons-box space-y-2 px-3 py-3">
            {location.pathname === "/setting" ? (
              <div
                className="cursor-pointer profile-dropdown-select flex items-center"
                onClick={() => navigate(-1)}
              >
                <IoMdArrowRoundBack className="mr-4" /> <span>Back</span>
              </div>
            ) : (
              <div
                className="cursor-pointer profile-dropdown-select flex justify-between items-center"
                onClick={() => navigate("/setting")}
              >
                <AiFillSetting className="mr-4" /> <span>Setting</span>
              </div>
            )}
            <div
              className="cursor-pointer profile-logout-select flex justify-between items-center"
              onClick={() => dispatch(setLogOut())}
            >
              <FiLogOut className="mr-4" /> <span>Logout</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <BsFillBellFill
            size={24}
            className="text-white cursor-pointer ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
