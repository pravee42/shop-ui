import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import ChayaTimeLogo from "../../assests/download.png";
import { RegisterUser } from "../data/config";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    shop_name: "",
    user: "",
    email: "",
    password: "",
  });
  const Register_Function = async () => {
    await RegisterUser(registerData);
  };
  return (
    <div>
      <Toaster />
      <div className="flex flex-row gap-3 items-center justify-evenly w-[100vw] flex-wrap">
        <Image src={ChayaTimeLogo} alt="Logo" />
        <div className="mt-8 space-y-6 w-[200px]">
          <span className="block text-xl font-medium text-slate-700">
            Register
          </span>
          <label className="block">
            <span className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </span>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              type="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email Address"
            />
          </label>
          <label className="block">
            <span className="block mb-2 text-sm font-medium text-gray-900">
              Shop Name
            </span>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  shop_name: e.target.value,
                })
              }
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Shop Name"
            />
          </label>
          <label className="block">
            <span className="block mb-2 text-sm font-medium text-gray-900">
              User Name
            </span>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  user: e.target.value,
                })
              }
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="User Name"
            />
          </label>
          <label className="block">
            <span className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </span>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              type="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Password"
            />
          </label>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={Register_Function}
          >
            Register
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2"
            onClick={() => {
              window.location.reload();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
