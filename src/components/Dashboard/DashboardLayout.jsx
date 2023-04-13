import React, { FC } from "react";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-[100vh] max-h-[100vh] overflow-y-hidden h-[100vh] flex flex-col">
      <div className="flex min-h-[100%]">
        <div className="w-[20%] hidden md:block bg-[#fff] min-h-[100%] ">
          <Sidebar />
        </div>
        <div className="w-[80%] flex flex-col min-h-[100%]">
          <Navbar />
          <div className="p-[20px] container mx-auto hidden md:block overflow-y-scroll scrollbar-hidden min-h-[90%] ">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
