import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Home = () => {
  const navigate = useNavigate();

  const changeDir = (dir) => {
    navigate(dir);
  };

  return (
    <DashboardLayout>
    <div className="Home">
      <div className="container mt-5" style={{ marginTop: "50px" }}>
        <div className="row d-flex justify-center items-center gap-[30px]">
        <div className="col-md-12 flex items-center justify-center mt-[30px]">
            <img src="/assets/images/logo.png" alt="" className="w-[250px]" />
          </div>

          <div className="col-md-12 ">
            <h1
              className="text-center text-2xl font-bold text-gray-700"
            >
              Welcome to Workflow Management Software
            </h1>
          </div>
         
        </div>
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-12 d-flex justify-content-center align-items-center ">
            {/* <button
              onClick={() => {
                navigate(ROUTES.Workflows);
              }}
              className=" btn btn-success"
            >
              Create Workflow Management
            </button> */}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Home;
