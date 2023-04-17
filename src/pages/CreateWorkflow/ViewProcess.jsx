import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { processapi } from "../../apis/Process/Process";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../routes/RouterConfig"
const ViewProcess = () => {
  const navigate = useNavigate();

  const [processes, setProcesses] = useState([]);

  const getData = async () => {
    const data = await processapi.getProcesses();
    if (data.success) {
      setProcesses(data.data);
    }
  };

  console.log(processes);

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardLayout>
    <div className="flex  items-center justify-center font-semibold text-3xl">All Processes</div>
      <div className="grid border-1 border-black grid-cols-3">
        {processes &&
          processes.map((item) => {
            return (
              <div style={{ overflow: "auto", maxHeight: "300px"}} class="block m-[3rem]  grid-cols-3 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h5 class="mb-2 text-xl font-medium leading-tight">
                  {item?.name}
                </h5>
                <p class="mb-4 text-base">
                  {item?.description}
                </p>
                <button
                  type="button"
                  class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  onClick={() => navigate(`${ROUTES.editProcess}?id=${item?._id}`)}
                  data-te-ripple-color="light"
                >
                  Edit
                </button>
              </div>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default ViewProcess;
