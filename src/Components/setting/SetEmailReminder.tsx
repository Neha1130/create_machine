import React, { useState, useEffect } from "react";
import {
  GetEmailReminderAlert,
  SetEmailReminderAlert,
} from "../../services/EmailReminderService";
import { setHeadersToken } from "../../services/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";
import { toast } from "react-toastify";
import { setLogOut } from "../../store/reducers/AuthuserSlice";

const SetEmailReminder = () => {
  const [state, setState] = useState({
    isCreateReminder: false,
    isEditReminder: false,
    isDeleteReminder: false,
    isStartStopReminder: false,
  });
  const { token } = useAppSelector((state) => state.authuser);
  const dispatch = useAppDispatch();

  const GetEmailReminder = async () => {
    const ress = await GetEmailReminderAlert(setHeadersToken(token));
    if (ress?.isSuccess) {
      if (ress?.data) {
        setState(ress.data);
      }
    } else {
      toast.error(ress?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (ress?.data.isNotAuth) {
        dispatch(setLogOut());
      }
    }
  };

  useEffect(() => {
    GetEmailReminder();
  }, []);

  const handleChange = async (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
    const ress = await SetEmailReminderAlert(
      {
        ...state,
        [e.target.name]: e.target.checked,
      },
      setHeadersToken(token)
    );
    if (ress?.isSuccess) {
      if (ress?.data) {
        toast.success(ress?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error(ress?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (ress?.data.isNotAuth) {
        dispatch(setLogOut());
      }
    }
  };

  return (
    <div className="px-10 pt-4">
      <h4 className="font-bold text-white text-2xl">Machine</h4>
      <div className="grid grid-cols-6 w-72">
        <div className="col-span-2 py-2 px-8">
          <p className="text-white text-base font-semibold text-left pb-1">
            Create
          </p>
        </div>
        <div className="col-span-3 py-2 px-8">
          <input
            className="cursor-pointer"
            type="checkbox"
            name="isCreateReminder"
            checked={state.isCreateReminder}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 w-72">
        <div className="col-span-2 py-2 px-8">
          <p className="text-white text-base font-semibold text-left pb-1">
            Edit
          </p>
        </div>
        <div className="col-span-3 py-2 px-8">
          <input
            className="cursor-pointer"
            type="checkbox"
            name="isEditReminder"
            checked={state.isEditReminder}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 w-72">
        <div className="col-span-2 py-2 px-8">
          <p className="text-white text-base font-semibold text-left pb-1">
            Delete
          </p>
        </div>
        <div className="col-span-3 py-2 px-8">
          <input
            className="cursor-pointer"
            type="checkbox"
            name="isDeleteReminder"
            checked={state.isDeleteReminder}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 w-72">
        <div className="col-span-2 py-2 px-8">
          <p className="text-white text-base font-semibold text-left pb-1">
            Start/Stop
          </p>
        </div>
        <div className="col-span-3 py-2 px-8">
          <input
            className="cursor-pointer"
            type="checkbox"
            name="isStartStopReminder"
            checked={state.isStartStopReminder}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SetEmailReminder;
