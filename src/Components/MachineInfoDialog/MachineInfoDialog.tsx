import React, { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { setHeadersToken } from "../../services/axiosConfig";
import {
  getVirtualMachineInfo,
  getVirtualMachinePassword,
} from "../../services/MachineInformationService";
import { setLogOut } from "../../store/reducers/AuthuserSlice";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";

type PropsType = {
  showInformation: any;
  setShowInformation: (value: any) => void;
};

const VmInfoDialog: FunctionComponent<PropsType> = (props) => {
  const { setShowInformation, showInformation } = props;
  const [showUserPassword, setShowUserPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [showtext, setShowText] = useState("");
  const [info, setInfo] = useState<any>(null);
  const { token } = useAppSelector((state) => state.authuser);
  const dispatch = useAppDispatch();
  const handleShowPassword = async (e: any) => {
    e.preventDefault();
    if (!!password) {
      const res = await getVirtualMachinePassword(
        { password: password, machineId: showInformation.id },
        setHeadersToken(token)
      );
      if (res?.isSuccess) {
        if (res?.data) {
          setShowText(atob(res?.data?.password));
          setShowUserPassword(!showUserPassword);
        }
      } else {
        toast.error(res?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (res?.data.isNotAuth) {
          dispatch(setLogOut());
        }
      }
    }
  };
  useEffect(() => {
    if (!!showInformation) {
      (async () => {
        const res = await getVirtualMachineInfo(
          showInformation.id,
          setHeadersToken(token)
        );
        if (res?.isSuccess) {
          if (res?.data) {
            console.log(res.data.data);
            setInfo(res?.data.data);
          }
        } else {
          toast.error(res?.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (res?.data.isNotAuth) {
            dispatch(setLogOut());
          }
        }
      })();
    }
  }, [showInformation]);
  return (
    <Modal open={true} onClose={() => setShowInformation(null)} center>
      {showUserPassword ? (
        <div className="w-80 mt-8">
          <div className="space-y-3">
            <p className="font-medium text-sm ml-2">
              User Name:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {info?.userName}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              password:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {!!showtext ? (
                  <span>{atob(showtext)}</span>
                ) : (
                  <>
                    <span className="relative top-[3px]">******</span>
                    <BsFillEyeSlashFill
                      className="inline text-gray-500 ml-2 cursor-pointer"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                    />
                  </>
                )}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              Machine Name:-
              <span className="font-normal float-right mr-4 text-gray-500 capitalize">
                {showInformation?.vmName}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              IP Address:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {info?.ipAddress}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              Operating System:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {showInformation?.windowName}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              RAM Memory:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {showInformation?.memory}
              </span>
            </p>
            <p className="font-medium text-sm ml-2">
              CPU:-
              <span className="font-normal float-right mr-4 text-gray-500">
                {showInformation?.cpuCount}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-80">
          <div className="mb-4">
            <AiOutlineArrowLeft
              className="cursor-pointer"
              size={22}
              onClick={() => setShowUserPassword(!showUserPassword)}
            />
          </div>
          <form onSubmit={handleShowPassword}>
            <p className="text-black text-lg font-semibold text-left pb-2">
              Password
            </p>
            <input
              type="password"
              className="common-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="common-btn !bg-green-600 !mt-5 justify-center"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default VmInfoDialog;
