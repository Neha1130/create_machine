import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import VmDialog from "../../Components/machine/MachineDialog";
import { setHeadersToken, socket } from "../../services/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";
import {
  VMDeleteApi,
  VMGetApi,
  VMStartStopApi,
} from "../../services/AllocateMachineService";
import { setLogOut } from "../../store/reducers/AuthuserSlice";
import { FaRegEdit } from "react-icons/fa";
import {
  closeAlertConfirm,
  showAlertConfirm,
} from "../../store/reducers/AlertConfirmDialogSlice";
import { ProgressBar } from "react-loader-spinner";
import VmInfoDialog from "../../Components/machine/MachineInfoDialog";

const operatingSystem = [
  { value: "win10", label: "Window 10" },
  { value: "win22", label: "Windows Server 2022" },
];
const CheckDisable = ["In Progress", "Stop"];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authuser);
  const [responseData, setResponseData] = useState([]);
  const [editData, setEditData] = useState<any>(null);
  const [showInformation, setShowInformation] = useState<any>(null);

  const handleFetch = async () => {
    const res = await VMGetApi(setHeadersToken(token));
    if (res?.isSuccess) {
      setResponseData(res?.data);
    } else {
      toast.error(res?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (res?.data.isNotAuth) {
        dispatch(setLogOut());
      }
    }
  };
  useEffect(() => {
    if (!!token)
      socket.on("fetch-vm-info", (data) => {
        if (data) {
          console.log(data);
          setResponseData(data.data);
        }
      });
  }, [socket]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDeleteVM = (id: string) => {
    dispatch(
      showAlertConfirm({
        show: true,
        text: "Are you sure you want to Delete?",
        icons: "info",
        handleCancel: () => {
          dispatch(closeAlertConfirm());
        },
        handleConfirm: async () => {
          dispatch(closeAlertConfirm());
          const res = await VMDeleteApi(id, setHeadersToken(token));
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
        },
        confirmText: "Delete",
        confirmClass: "!bg-red-600 !border-red-600",
        cancelText: "Cancel",
      })
    );
  };

  const handleStartStop = async (id: string, status: any) => {
    const res = await VMStartStopApi(id, status, setHeadersToken(token));
    if (res?.isSuccess) {
      if (res?.data) {
        toast.success(res?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        handleFetch();
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

  const handleMachineShow = (data: any) => {
    setShowInformation(data);
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex space-x-2 justify-end mr-5 mb-2">
            <button
              type="button"
              onClick={() => navigate("/machine-create")}
              className="common-btn mt-6"
            >
              Create VM
            </button>
          </div>
          <div className="overflow-hidden p-5">
            <table className="min-w-full border text-center radius-sm">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Sno.
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    VM name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    CPU count
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Memory
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    OS
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Start/Stop
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {responseData?.map((data: any, index: number) => {
                  const windowName = operatingSystem.find(
                    (datas) => datas.value === data.operatingSystem
                  );
                  return (
                    <tr className="border-b" key={data.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        <span
                          className={`capitalize font-semibold ${
                            data?.isMachineInstall
                              ? "cursor-pointer text-blue-500"
                              : ""
                          }`}
                          onClick={() => {
                            if (data?.isMachineInstall) {
                              handleMachineShow({
                                ...data,
                                windowName: windowName?.label,
                              });
                            }
                          }}
                        >
                          {data.machineName}
                        </span>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {data.cpuCore}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {data.memory}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {windowName?.label}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {data?.machineStatus === "Stop" ? (
                          <button
                            type="button"
                            className="common-btn !mt-0 !bg-red-600"
                            disabled={data?.machineStatus === "In Progress"}
                            onClick={() =>
                              handleStartStop(data.id, {
                                runstatus: "stop",
                              })
                            }
                          >
                            Stop
                          </button>
                        ) : data?.machineStatus === "Start" ? (
                          <button
                            type="button"
                            disabled={data?.machineStatus === "In Progress"}
                            className="common-btn !mt-0 !bg-green-600"
                            onClick={() =>
                              handleStartStop(data.id, {
                                runstatus: "start",
                              })
                            }
                          >
                            Start
                          </button>
                        ) : (
                          data?.machineStatus === "In Progress" && (
                            <div className="flex justify-center">
                              <ProgressBar
                                height="35"
                                width="80"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor="#2c2c2c"
                                barColor="#707070"
                              />
                            </div>
                          )
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        <FaRegEdit
                          fontSize={22}
                          className={`inline ${
                            CheckDisable.includes(data?.machineStatus)
                              ? "text-gray-600 opacity-70"
                              : "cursor-pointer text-sky-600"
                          }`}
                          onClick={() => {
                            if (!CheckDisable.includes(data?.machineStatus)) {
                              setEditData(data);
                            }
                          }}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <AiFillDelete
                          fontSize={22}
                          className={`inline ${
                            !CheckDisable.includes(data?.machineStatus)
                              ? "cursor-pointer text-red-600"
                              : "text-gray-600 opacity-70"
                          }`}
                          onClick={() => {
                            if (!CheckDisable.includes(data?.machineStatus)) {
                              handleDeleteVM(data.id);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!!editData && (
        <VmDialog
          editData={editData}
          setEditData={setEditData}
          handleFetch={handleFetch}
        />
      )}
      {!!showInformation && (
        <VmInfoDialog
          showInformation={showInformation}
          setShowInformation={setShowInformation}
        />
      )}
    </div>
  );
};

export default Home;
