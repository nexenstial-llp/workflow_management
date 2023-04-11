import React, { useEffect } from "react";
import { useState, useEFfect } from "react";
import { Table } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Loader/Loader";
import { userApi } from "../../../apis/User/User";
const Getuser = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div>
      <ToastContainer />
      {loading && <Loader />}
      <div className="my-[2rem] flex items-center justify-center">
      <p className="font-semibold text-4xl">User Details.</p>
      </div>
      <div className="p-12">
        <Table columns={columns} dataSource={details} pagination={false} />
      </div>
    </div>
  );
};

export default Getuser;
