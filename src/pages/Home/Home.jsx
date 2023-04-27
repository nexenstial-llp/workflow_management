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
        <div className="grid grid-cols-3 gap-[15px] mt-[60px]">

         
            <div className="card">
              <div className="card-body flex items-center flex-col">
                <h5 className="card-title text-2xl font-semibold">Total Items</h5>
                <p className="card-text text-xl">
                  5
                </p>
                
          </div>

        </div>
        <div className="card">
              <div className="card-body flex items-center flex-col">
                <h5 className="card-title text-2xl font-semibold">Approval Request</h5>
                <p className="card-text text-xl">
                  0
                </p>
                
          </div>

        </div>
        <div className="card">
              <div className="card-body flex items-center flex-col">
              <h5 className="card-title text-2xl font-semibold">Input Request</h5>

                <p className="card-text text-xl">
                  0
                </p>
                
          </div>

        </div>
    </div>
    </div>
    </div>
    </DashboardLayout>
  );
};

export default Home;
