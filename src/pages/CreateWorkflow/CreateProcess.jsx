import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const CreateProcess = () => {
  const navigate = useNavigate();

  const [details,setDetails] = useState({
    name:"",
    desc:"",
  }); 

  const handleChange = (e) =>{
    const newData = { ...details };
    newData[e.target.name] = e.target.value;
    setDetails(newData);
  } 

  const next = () =>{
    localStorage.setItem("process",JSON.stringify(details));
    navigate(ROUTES.CreateForm);
  }

  return (
    <DashboardLayout>
      <div>
        <div className="container m-auto sm:p-5 p-3 mt-5">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ marginTop: "150px" }}
          >
            <div className="col-md-6">
              <div className="card rounded-lg cursor-pointer shadow-sm mb-3">
                <div className="card-header">
                  <h1 style={{ fontWeight: "500", fontSize: "25px" }}>
                    Create Process
                  </h1>
                </div>
                <div className="card-body p-3">
                  <div className="form-group">
                    <label htmlFor="">Process Name</label>
                    <input type="text" name="name" onChange={handleChange} value={details.name} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input type="text" name="desc" onChange={handleChange} value={details.desc} className="form-control" />
                  </div>
                  <button
                    onClick={() => next()}
                    className="btn btn-success cursor-pointer float-right"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProcess;
