import { useState } from "react";
import EditProfile from "../../Components/setting/EditProfile";
import SetEmailReminder from "../../Components/setting/SetEmailReminder";

export const Setting = () => {
  const [state, setState] = useState(0);
  return (
    <div className="mx-24 mt-16">
      <div className="grid grid-cols-10">
        <div className="col-span-2 border border-black-400 h-96">
          <div
            className="p-4 border-b border-black-400 cursor-pointer bg-slate-100"
            onClick={() => setState(0)}
          >
            <p className="text-base text-gray-500 font-semibold text-center">
              Edit Profile
            </p>
          </div>
          <div
            className="p-4 border-b border-black-400 cursor-pointer bg-slate-100"
            onClick={() => setState(1)}
          >
            <p className="text-base text-gray-500 font-semibold text-center ">
              Send Email Alert
            </p>
          </div>
        </div>
        <div className="col-span-8">
          <div className="bg-slate-500 h-full">
            {state === 0 ? <EditProfile /> : <SetEmailReminder/>}
          </div>
        </div>
      </div>
    </div>
  );
};
