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
      <div className="w-[95%] m-auto     ">
        <div className="grid grid-cols-3 border-b-[2px] border-[#F2ECFF] py-[10px]">
          <div class="col-span-2 w-full flex items-end text-2xl font-semibold  justify-start">
            All Applications
          </div>
          <div class="col-span-1 flex  items-end justify-end">
            <button
              type="button"
              class="inline-block rounded bg-[#000] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              onClick={() => next()}
              data-te-ripple-color="light"
            >
              Create Application
            </button>
          </div>
        </div>

        <div className="flex items-center min-h-[500px] justify-center flex-col">


          {applications &&
            applications.map((item, key) => {
              return (
                <section
                  key={key}
                  className="section border-[1px] border-b-2 p-6 mt-10 transition-all"
                >

                  <div className="flex justify-between">
                    <div className="">
                      <div className="text-2xl font-semibold">{item.name}</div>
                      <div className="text-sm pt-[0.6rem]">{item.description}</div>
                    </div>

                    <div className="flex flex-row justify-end">
                    Created At : {item?.createdAt?.split("T")[0] || "-"}
                    </div>

                  </div>

                  <div className="text-lg pt-[2rem] font-semibold">Workflow</div>
                  <div className="grid border-1 border-black grid-cols-3 gap-[30px] mt-[25px]">
                    {item?.approvals &&
                      item?.approvals.map((k, key1) => {
                        return (
                          <div
                            style={{ overflow: "auto", maxHeight: "300px" }}
                            class="block  p-[10px] border-[1px] rounded-lg bg-white  shadow-md dark:bg-neutral-700"
                          >


                            <div className="flex flex-col">
                              <h5 class="mb-2 text-md font-medium leading-tight">
                                Title{" "}
                              </h5>
                              <p class="mb-6 text-base capitalize">
                                {k.title}
                              </p>
                            </div>

                            <div className="flex flex-col">
                              <h5 class="mb-2 text-md font-medium leading-tight">
                                Type Of Approval{" "}
                              </h5>
                              <p class="mb-6 text-base capitalize">
                                {k.type_of_approval}
                              </p>
                            </div>



                            <div className="flex flex-col">
                              <p className="mb-2 text-lg font-medium leading-tight">
                                Status {" "}
                              </p>
                              <button
                                className={`cursor-not-allowed pointer-events-none  rounded p-[5px] px-[10px] ${k.status == "Pending"
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


          {
            applications && applications.length == 0 && (
              <div className="flex flex-row justify-end mt-[1rem]">
                <p>No Applications Created</p>
              </div>)
          }
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
