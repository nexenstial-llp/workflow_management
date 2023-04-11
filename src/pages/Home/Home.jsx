import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";

const Home = () => {
  const navigate = useNavigate();

  const changeDir = (dir) => {
    navigate(dir);
  };

  return (
    <div className="Home">
      <div className="container mt-5" style={{ marginTop: "50px" }}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-12 ">
            <h1
              className="text-center"
              style={{ fontSize: "50px", marginBottom: "50px" }}
            >
              Welcome to Workflow Management Software
            </h1>
          </div>
          <div className="col-md-6">
            <img src="/assets/images/logo.png" alt="" width={"1000"} />
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-12 d-flex justify-content-center align-items-center ">
            <button
              onClick={() => {
                navigate(ROUTES.Workflows);
              }}
              className=" btn btn-success"
            >
              Create Workflow Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
