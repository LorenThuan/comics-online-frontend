import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequired = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      
      <div className="flex flex-col items-center mt-10 space-y-5">
        <h2 className="text-xl font-bold">
          You need to sign in to access this page.
        </h2>
        <div className="flex space-x-4 items-center">
          <button onClick={() => navigate("/auth/login")} className="py-2 px-4  text-white font-bold rounded-lg bg-orange-500 hover:opacity-50">
            Sign in
          </button>
          <button onClick={() => navigate("/auth/register")} className="py-2 px-4  rounded-lg bg-gray-200 hover:bg-gray-400 font-medium">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
