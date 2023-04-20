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

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (name,desc,id) =>{
    const process = {
          name:name,
          description:desc
    } 
    localStorage.setItem("process",JSON.stringify(process));
    navigate(`${ROUTES.editProcess}?id=${id}`);
  }

  return (
    <DashboardLayout>
    <div className="flex  items-center justify-center font-semibold text-3xl">All Processes</div>
      <div className="grid border-1 border-black grid-cols-3 gap-[30px] mt-[45px]">
        {processes &&
          processes.map((item) => {
            return (
              <div style={{ overflow: "auto", maxHeight: "300px"}} class="block  p-[20px] rounded-lg bg-white  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h5 class="mb-2 text-xl font-medium leading-tight">
                  {item?.name}
                </h5>
                <p class="mb-4 text-base capitalize">
                  {item?.description || "-"}
                </p>
                <button
                  type="button"
                  className="bg-[#000] ml-auto text-[#fff] font-medium flex gap-[10px] items-center justify-center rounded-[8px] px-[20px] py-[10px] "
                  data-te-ripple-init
                  onClick={() => handleSubmit(item?.name,item?.description,item?._id)}
                  data-te-ripple-color="light"
                >
                  View
                  <i className="bi bi-eye"></i>
                </button>
              </div>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default ViewProcess;
