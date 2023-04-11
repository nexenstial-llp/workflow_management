import React from "react";
import { useState, useEffect } from "react";
import Input from "../../Input/Input";
import { userApi } from "../../../apis/User/User";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";

import { Select, Modal } from "antd";
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

  const change = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
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
      details.name == "" ||
      details.role == "" ||
      details.phoneNo == "" ||
      details.email == "" ||
      details.password == ""
    ) {
      toast.error("All Fields are required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      setLoading(true);
      const data = await userApi.addUsers({ details, phone });
      console.log(data);
      if (data.success) {
        toast.success("Succesfully Added User !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error("Something went wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
    clear();
  };

  function info(name, value) {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="h-[100vh] p-4 my-[4rem]">
      <ToastContainer />
      {loading && <Loader />}
      <p className="font-semibold text-2xl mx-32">Add Users.</p>
      <div className="p-4 flex grid-cols-2">
        <div className=" col-span-1 w-full">
          <Input
            label="Name"
            name="name"
            placeholder="Name"
            className="mx-28"
            type="text"
            handleChange={handleChange}
            value={details.name}
          />
        </div>
        <div className="col-span-1 w-full">
          <Input
            label="Phone Number"
            name="Phone Number"
            placeholder="Phone Number"
            type="Number"
            className="mx-28"
            min={0}
            handleChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
      </div>
      <div className="p-4 flex grid-cols-2">
        <div className="col-span-1 w-full">
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            className="mx-28"
            type="email"
            handleChange={handleChange}
            value={details.email}
          />
        </div>
        <div className="col-span-1 w-full">
          <Input
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            className="mx-28"
            handleChange={handleChange}
            value={details.password}
          />
        </div>
      </div>

      <div className="p-4 flex grid-cols-2">
        <div className="col-span-1 flex flex-col w-full">
          <label className="text-[#333333] opacity-70 font-semibold text-[18px] px-[7rem]">
            Role
          </label>
          <Select
            defaultValue="Select Role"
            className="mx-[7rem] my-[1rem]"
            style={{
              width: 580,
            }}
            value={details.role || "Select Role"}
            onChange={(value) => info("role", value)}
            options={options}
          />
        </div>
        <div className="col-span-1 hidden w-full">
          <Input
            label="Image"
            name="image"
            placeholder="Image"
            type="file"
            className="mx-28"
            handleChange={change}
          />
        </div>
      </div>
      <div className="items-center py-[3rem] justify-center w-full flex">
        <button
          onClick={submit}
          class="bg-blue-500 hover:bg-blue-400 w-[9rem] h-[3rem] text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Adduser;
