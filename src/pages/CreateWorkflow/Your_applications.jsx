import React from "react";
import { applicationapi } from "../../apis/Application/Applicationapi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  let id = localStorage.getItem("uid");
  const getData = async () => {
    try {
      let data = await applicationapi.getAllapprovals();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(applications);

  useEffect(() => {
    getData();
  }, []);

 

  const next = (name, desc, id) => {
    navigate(ROUTES.getItems);
  };

  return (
    <DashboardLayout>
      <div className="sm:w-[90%] w-[95%] m-auto shadow-card border-[1px] border-[#F2ECFF] sm:p-10 p-2">
        <div class="grid grid-cols-3">
          <div class="col-span-2 w-full flex items-end text-3xl font-semibold pr-[10rem] justify-end">
            Your Applications
          </div>
          <div class="col-span-1 m-[0.6rem] grid items-end justify-end">
            <button
              type="button"
              class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              onClick={() => next()}
              data-te-ripple-color="light"
            >
              Create Application
            </button>
          </div>
        </div>
        {applications &&
          applications.map((item, key) => {
            return (
              <section
                key={key}
                className="section border-[1px] border-b-2 p-6 mt-10 transition-all"
              >
                <div className="text-2xl font-semibold">{item.name}</div>
                <div className="text-sm pt-[0.6rem]">{item.description}</div>
                <div className="text-lg pt-[2rem]">Approvals</div>
                <div className="grid border-1 border-black grid-cols-3 gap-[30px] mt-[25px]">
                  {item?.approvals &&
                    item?.approvals.map((k, key1) => {
                      return (
                        <div
                          style={{ overflow: "auto", maxHeight: "300px" }}
                          class="block  p-[20px] rounded-lg bg-white  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                        >
                          <div className="flex flex-row gap-[1rem]">
                            <h5 class="mb-2 text-md font-medium leading-tight">
                              Type Of Approval :{" "}
                            </h5>
                            <p class="mb-6 text-base capitalize">
                              {k.type_of_approval}
                            </p>
                          </div>
                          <div className="flex flex-row">
                            <p className="mb-2 text-lg font-medium leading-tight">
                              Status :{" "}
                            </p>
                            <button
                              className={`cursor-not-allowed pointer-events-none mx-[1rem] rounded p-1 px-3 ${
                                k.status == "Pending"
                                  ? "bg-orange-500"
                                  : k.status == "Completed"
                                  ? "bg-green-500"
                                  : k.status == "Rejected"
                                  ? "bg-red-500"
                                  : ""
                              }`}
                            >
                              {k.status}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default Applications;
