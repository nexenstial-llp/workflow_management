import React from "react";
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { userApi } from "../../../apis/User/User";
import Loader from "../../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Select, Modal } from "antd";
import DashboardLayout from "../../Dashboard/DashboardLayout";
import { ROUTES } from "../../../routes/RouterConfig";
import { useNavigate } from "react-router-dom";
const Adduser = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [file, setFile] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const options = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "User",
      value: "user",
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...details };
    newData[e.target.name] = e.target.value;
    setDetails(newData);
    console.log(details);
  };

  const clear = () => {
    setDetails({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    setFile(null);
    setPhone(null);
  };

  const submit = async () => {
    if (
      !details.name ||
      !details.email ||
      !details.password ||
      !details.role ||
      !phone
    ) {
      toast.error("All Fields are required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      setLoading(true);
      const data = await userApi.addUsers({ ...details, phone });

      if (data.success) {
        toast.success("Succesfully Added User !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate(ROUTES.getUser);
        clear();
      }
    } catch (err) {
      toast.error("Something went wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  function info(name, value) {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <DashboardLayout>
      <div className="h-[100vh] container flex flex-col">
        <ToastContainer />
        {loading && <Loader />}
        <h2 className="font-semibold text-[var(--secondary)] mt-[30px] text-[18px]">
          Add Employee
        </h2>
        <div className="grid grid-cols-2 mt-[45px] w-[100%] gap-[15px]">
          <div className="col-span-1">
            <Input
              label="Name"
              name="name"
              placeholder="Name"
              type="text"
              handleChange={handleChange}
              value={details.name}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Phone Number"
              name="Phone Number"
              placeholder="Phone Number"
              type="Number"
              min={0}
              handleChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div className="col-span-1">
            <Input
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
              handleChange={handleChange}
              value={details.email}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              handleChange={handleChange}
              value={details.password}
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="text-[#333333] opacity-70  text-[16px]">
              Role
            </label>
            <Select
              defaultValue="Select Role"
              className="mt-[5px] w-[100%] h-[3rem] flex flex-col items-center "
              value={details.role || "Select Role"}
              onChange={(value) => info("role", value)}
              options={options}
            />
          </div>
        </div>
        <div className="relative ">
          <div className="footer border-[1px] max-width-[100%] md:w-[80%] w-[100%] fixed bottom-0 shadow-md bg-[#fff] right-[0px] ">
            <div className="flex justify-between gap-[10px] p-[10px]">
              <button
                className=" text-black font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  navigate(ROUTES.getUser);
                }}
              >
                Cancel
              </button>

              <button
                className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  submit(e);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Adduser;
