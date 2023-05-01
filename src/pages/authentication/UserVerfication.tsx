import path from "path";
import React, { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { VerificationApi } from "../../services/AuthService";
import { PAGE_PATH } from "../../routes/Pagepath";

const UserVerfication: FunctionComponent = () => {
  const params = useParams();
  const navigation = useNavigate()
  const [state, setState] = useState<any>({});
  useEffect(() => {
    (async () => {
      if (params.id) {
        const res: any = await VerificationApi(params.id);
        if (res?.isSuccess) {
          if (res?.data) {
            setState(res.data);
          }
        } else {
          setState(res.data);
        }
      }
    })();
  }, [params]);
  return (
    <div
      className={`bg-gradient-to-r ${
        state?.isVerified
          ? "from-green-500 to-green-500"
          : "from-red-500 to-red-500"
      } h-screen`}
    >
      <div className="flex justify-center">
        <div className="w-1/3 bg-slate-200 mt-64 h-72 border border-gray-400 shadow-lg rounded-md shadow-gray-600">
          <div className="text-center mt-8">
            <div className="flex justify-center mb-8">
              {state?.isVerified ? (
                <BsCheck2Circle size={90} className="text-green-500" />
              ) : (
                <AiOutlineCloseCircle size={90} className="text-red-500" />
              )}
            </div>
            {state?.isVerified ? (
              <p className="text-green-500 text-xl font-semibold">
                {state?.message}
              </p>
            ) : (
              <p className="text-red-500 text-xl font-semibold">
                {state?.message}
              </p>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <button className="common-btn" onClick={()=>navigation(PAGE_PATH.login)}>Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerfication;
