import React, { useEffect, useState } from "react";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
// import { ADD_COMPANY, EMPLOYEE } from '../../navigation/Constant';
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/RouterConfig";

const SidebarOptions = [
  {
    name: "Dashboard",
    icon: <UserOutlined />,
    route: "/",
  },
  {
    name: "Input Request",
    icon: <UserOutlined />,
    route: ROUTES.getInputRequests,
    
  },
  {
    name: "Approval Request",
    icon: <UserOutlined />,
    route: ROUTES.getApprovalRequests,
  },
  {
    name: "Processes",
    icon: <UserOutlined />,
    route: ROUTES.getProcess,
  },
  
  {
    name: "My Items",
    icon: <UserOutlined />,
    route: ROUTES.yourApplications,
  },
  {
    name: "Users",
    icon: <UserOutlined />,
    route: ROUTES.getUser,
  },
];

const Sidebar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [selected, setSelected] = React.useState("Users");

  let role = localStorage.getItem("role");

  useEffect(() => {
    const path = location?.pathname;
    console.log("path", path);
    setSelected(SidebarOptions?.find((item) => item?.route == path)?.name);
    console.log("selectedPage", SidebarOptions?.find((item) => item?.route == path)?.name);
  }, [location]);

  return (
    <div className="p-[20px] h-[100%] border-r-[1px] flex flex-col max-h-[100%]">
      <div className=" text-3xl font-bold text-nex">Nexenstial</div>

      <ul className="mt-[30px] pt-[30px] border-t-[1px] ">
        {SidebarOptions.map((option, index) => {
          if (option.name !== "Users" && role === "users" || role === "admin") {
          return (
            <li
              className={
                "p-[10px] rounded-[4px] gap-[10px] text-center flex items-center text-[18px] cursor-pointer my-[10px] " +
                (selected == option?.name
                  ? " bg-[#000] text-white"
                  : " text-[#00000080] font-[500]")
              }
              onClick={() => {
                setSelected(option?.name);
                navigate(option?.route);
              }}
            >
              {option?.icon}
              <p className="m-0 ">{option?.name}</p>
            </li>
          );
            }
            else{
              return null;
            }
        })}
      </ul>

      {
        role && role === "admin" ? 
      <button
        className="w-[100%] flex gap-[20px] items-center bg-[#000]/[0.1] rounded-[4px] p-[15px] text-[18px] font-bold mt-auto"
        onClick={(e) => {
          navigate(ROUTES.SelectStep);
        }}
      >
        <div className="rounded-[4px] w-[30px] h-[30px] justify-center flex items-center text-[20px] font-bold bg-[#000]/[0.25] ">
          +
        </div>
        Create
      </button>
      :null}
    </div>
  );
};

export default Sidebar;
