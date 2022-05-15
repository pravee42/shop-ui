import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import ChayaTimeLogo from "../../assests/download.png";
import { RegisterUser } from "../data/config";
export default function Register(props) {
  const [registerData, setRegisterData] = useState({
    shop_name: "",
    user: "",
    email: "",
    password: "",
  });
  const Register_Function = async () => {
    await RegisterUser(registerData);
    await props.hidefnc();
  };
  return (
    <div>
      <Toaster />
      <div className="d-flex flex-row gap-3 justify-content-center m-4 w-100">
        <Image src={ChayaTimeLogo} alt="Logo" />
        <div className="d-flex flex-column gap-3 justify-content-evenly">
          <input
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
            type="email"
            className="border bg-light text-primary p-2"
            placeholder="Email Address"
          />
          <input
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                shop_name: e.target.value,
              })
            }
            type="text"
            className="border bg-light text-primary p-2"
            placeholder="Shop Name"
          />
          <input
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                user: e.target.value,
              })
            }
            type="text"
            className="border bg-light text-primary p-2"
            placeholder="User Name"
          />
          <input
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
            type="password"
            className="border bg-light text-primary p-2"
            placeholder="Password"
          />
          <button
            className="border border-primary shadow-xl text-primary p-2 hover-overlay ripple shadow-1-strong rounded"
            onClick={Register_Function}
          >
            Register
          </button>
          <button className="btn btn-primary" onClick={props.hidefnc}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
