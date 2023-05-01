import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  VMCreateApi,
  VMUpdateApi,
} from "../../services/AllocateMachineService";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";
import { setHeadersToken } from "../../services/axiosConfig";
import { setLogOut } from "../../store/reducers/AuthuserSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Select from "react-select";

const operatingSystemOption = [
  { value: "win10", label: "Windows 10" },
  { value: "win22", label: "Windows Server 2022" },
];

const memoryOption = [
  { value: "2GB", label: "2 GB" },
  { value: "4GB", label: "4 GB" },
  { value: "8GB", label: "8 GB" },
  { value: "16GB", label: "16 GB" },
];

const cpuOption = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];
type PropsType = {
  editData?: any;
  setEditData?: (value: any) => void;
  handleFetch?: () => void;
};
const VmCreateFrom: FunctionComponent<PropsType> = (props) => {
  const { editData, setEditData, handleFetch } = props;
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authuser);
  const [machineName, setMachineName] = useState("");
  const [memoryState, setMemoryState] = useState<any>({
    value: "",
    label: "select Memory",
  });
  const [cpuState, setCpuState] = useState<any>({
    value: "",
    label: "select CPU",
  });
  const [windowState, setWindowState] = useState<any>({
    value: "",
    label: "select Operating system",
  });
  useEffect(() => {
    if (!!editData) {
      setMachineName(editData.machineName);
      setWindowState(
        operatingSystemOption.filter(
          (data) => data.value === editData.operatingSystem
        )[0]
      );
      setMemoryState(
        memoryOption.filter((data) => data.value === editData.memory)[0]
      );
      setCpuState(
        cpuOption.filter((data) => data.value === editData.cpuCount)[0]
      );
    }
  }, [editData]);

  const handleCreateVM = async (e: any) => {
    e.preventDefault();
    if (
      !!machineName &&
      !!windowState.value &&
      !!cpuState.value &&
      !!memoryState.value
    ) {
      const res = await VMCreateApi(
        {
          machineName: machineName,
          memory: memoryState.value,
          cpuCore: cpuState.value,
          operatingSystem: windowState.value,
        },
        setHeadersToken(token)
      );
      if (res?.isSuccess) {
        if (res?.data) {
          toast.success(res?.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigator("/home");
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

  const handleUpdateMachine = async () => {
    const res = await VMUpdateApi(
      editData.id,
      {
        machineName: machineName,
        memory: memoryState.value,
        cpuCore: cpuState.value,
        operatingSystem: windowState.value,
      },
      setHeadersToken(token)
    );

    if (res?.isSuccess) {
      if (res?.data) {
        toast.success(res?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (setEditData && handleFetch) {
          setEditData(null);
          handleFetch();
        }
      }
    } else {
      toast.error(res?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (res?.data.isNotAuth) {
        dispatch(setLogOut());
      }
    }
  };
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      border: "2px solid rgb(114 114 114)",
      boxShadow: "orange",
      borderRadius: "7px",
      "&:hover": {
        border: "2px solid black",
      },
    }),
  };
  return (
    <form className="w-full bg-white border-2 rounded-md py-5 text-center mt-10">
      <div className="flex justify-center items-center relative">
        {!editData && (
          <div className="absolute left-[15px]">
            <AiOutlineArrowLeft
              className="cursor-pointer"
              size={22}
              onClick={() => navigator("/")}
            />
          </div>
        )}
        <h1 className="text-2xl font-black border-b-2 inline-block border-gray-500 pb-1">
          Virtual Creation
        </h1>
      </div>
      <div className="w-full px-10 mt-8">
        <p className="text-black text-lg font-semibold text-left pb-1">
          VM name
        </p>
        <input
          className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
          value={machineName}
          disabled={!!editData}
          type="text"
          name="machineName"
          onChange={(e: any) => setMachineName(e.target.value)}
        />
      </div>
      <div className="w-full px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">
          CPU Core
        </p>
        <div className="text-left">
          <Select
            options={cpuOption}
            styles={style}
            placeholder="test"
            value={cpuState}
            onChange={(value) => {
              setCpuState(value);
            }}
          />
        </div>
      </div>
      <div className="w-full px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">
          Memory (GB)
        </p>
        <div className="text-left">
          <Select
            options={memoryOption}
            styles={style}
            value={memoryState}
            onChange={(value) => {
              setMemoryState(value);
            }}
          />
        </div>
      </div>
      <div className="px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">
          Operating System
        </p>
        <div className="text-left">
          <Select
            isDisabled={!!editData}
            options={operatingSystemOption}
            styles={style}
            value={windowState}
            onChange={(value) => {
              setWindowState(value);
            }}
          />
        </div>
      </div>
      <div>
        {!!editData ? (
          <button
            type="button"
            className="common-btn mt-8"
            onClick={handleUpdateMachine}
          >
            Update Machine
          </button>
        ) : (
          <button
            type="button"
            className="common-btn mt-8"
            onClick={handleCreateVM}
          >
            Create Machine
          </button>
        )}
      </div>
    </form>
  );
};

export default VmCreateFrom;
