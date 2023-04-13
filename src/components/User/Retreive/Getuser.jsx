import React, { useEffect } from "react";
import { useState, useEFfect } from "react";
import { Table } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Loader/Loader";
import { userApi } from "../../../apis/User/User";
import DashboardLayout from "../../Dashboard/DashboardLayout";
import {ROUTES} from "../../../routes/RouterConfig";
import { useNavigate } from "react-router-dom";

const Getuser = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      setLoading(true);
      const data = await userApi.getUsers();
      console.log(data.data);
      setDetails(data.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  },[]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <DashboardLayout>
    <div>
      <ToastContainer />
      {loading && <Loader />}
      <div className="mt-[20px] flex gap-[15px]">
          <p className="font-semibold text-[18px] text-[var(--secondary)]">All Users</p>
          <div className="flex items-center ml-auto justify-center hidden md:block border-[1px] border-[#e5e5e5] px-[10px]">
            {/* <img src="./assets/search.png" className="object-contain mr-[10px] " alt="" />  */}
            <input type="text"
              // onChange={searchList}
              className='focus:border-0 outline-0 h-[100%] ' placeholder={'Search Users'} />
          </div>
          <button className=" text-white rounded-[4px] text-[14px] bg-[#000]  md:ml-[10px] py-[7px] px-[20px]"
            onClick={(e) => {
              navigate(ROUTES.addUser)
            }}
          >+ Add Users</button>
        </div>
      <div className="mt-[30px]">
        <Table columns={columns} dataSource={details} pagination={false} />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Getuser;
