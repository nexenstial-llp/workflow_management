import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { processapi } from "../../apis/Process/Process";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";

const CreateProcess = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const newData = { ...details };
    newData[e.target.name] = e.target.value;
    setDetails(newData);
  };

  console.log(details);

  const [route, setRoute] = useState(ROUTES.CreateForm);
  const [loading, setLoading] = useState(false);

  const next = async () => {
    if (details.name == "" || details.desc == "") {
      toast.error("All Fields are required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    localStorage.setItem("process", JSON.stringify(details));
    localStorage.removeItem("approvers");
    navigate(`${route}`);
    // try {
    //   setLoading(true);
    //   let data = await processapi.addprocesses(details);
    //   console.log(data.data._id);
    //   if (data.success) {
    //     toast.success("Succesfully Added Process !", {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }
    //   localStorage.setItem("process", JSON.stringify(details));
    // } catch (err) {
    //   toast.error("Something went wrong !", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <DashboardLayout>
      <div>
        <ToastContainer />
        {loading && <Loader />}
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
                <div className="card-body p-3 flex gap-[10px] flex-col">
                  <div className="form-group">
                    <label htmlFor="">Process Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Process Name"
                      onChange={handleChange}
                      value={details.name}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      onChange={handleChange}
                      value={details.description}
                      className="form-control"
                    />
                  </div>
                  <button
                    onClick={() => next()}
                    className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px] "
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
