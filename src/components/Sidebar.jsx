import React, { useEffect, useState } from "react";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
// import { ADD_COMPANY, EMPLOYEE } from '../../navigation/Constant';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/RouterConfig";

const SidebarOptions = [
  {
    name: "Dashboard",
    icon: <UserOutlined />,
    route: "/dashboard/home",
  },
  {
    name: "Input Request",
    icon: <UserOutlined />,
    route: ROUTES.getUser,
  },
  {
    name: "Approvals",
    icon: <UserOutlined />,
    route: ROUTES.getUser,
  },
  {
    name: "My Items",
    icon: <UserOutlined />,
    route: ROUTES.getUser,
  },
  {
    name: "Users",
    icon: <UserOutlined />,
    route: ROUTES.getUser,
  },
];

const Sidebar = (props) => {
  // const router = useRouter()

  const handleClick = (e, route) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const [selected, setSelected] = React.useState("Users");
  const [selectedPage, setSelectedPage] = useState("");
  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: (
        <p className="text-[var(--secondary)] font-semibold">
          Add New Business
        </p>
      ),
      key: "3",
      icon: <PlusOutlined />,
      // danger: true,
    },
  ];

  const handleMenuClick = (e) => {
    if (Number(e?.key) == 3) {
      // navigate(ADD_COMPANY)
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="p-[20px] h-[100%] border-r-[1px] flex flex-col max-h-[100%]">
      <div className=" text-3xl font-bold text-nex">Nexenstial</div>

      <ul className="mt-[30px] pt-[30px] border-t-[1px] ">
        {SidebarOptions.map((option, index) => {
          return (
            <li
              className={
                "p-[10px] rounded-[4px] gap-[10px] text-center flex items-center text-[18px] cursor-pointer my-[10px] " +
                (selected == option?.name
                  ? " bg-[#000] text-white"
                  : " text-[#00000080] font-[500]")
              }
              onClick={(e) => {
                navigate(option?.route);
              }}
            >
              {/* <img src="" alt="" /> */}
              {option?.icon}
              <p className="m-0 ">{option?.name}</p>
            </li>
          );
        })}
      </ul>

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
    </div>
  );
};

export default Sidebar;
