import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { processapi } from "../../apis/Process/Process";
import { useState, useEffect } from "react";
import { ROUTES } from "../../routes/RouterConfig"
import { useNavigate } from "react-router-dom";
const Youritems = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([]);

  const getData = async () => {
    const data = await processapi.getprocessesforUser();
    if (data.success) {
      console.log(data.data);
      setProcesses(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (name, desc, id) => {
    const process = {
      name: name,
      description: desc,
    };
    localStorage.setItem("process", JSON.stringify(process));
    navigate(`${ROUTES.Formedit}/${id}`);
  };

  return (
    <DashboardLayout>

    <div>
      <h1 className="text-2xl text-center font-semibold">Select Process to Create Application</h1>
    </div>
      <div className="grid grid-cols-3 mt-[30px]">
        {processes &&
          processes.map((item) => {
            return (
              <div
                style={{ overflow: "auto", maxHeight: "300px" }}
                class="block  grid-cols-3 rounded-lg bg-white p-[10px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
              >
                <h5 class="mb-2 text-xl font-medium leading-tight">
                  {item?.name}
                </h5>
                <p class="mb-4 text-base">{item?.description}</p>
                <button
                  type="button"
                  class="inline-block rounded bg-[#000] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md"
                  data-te-ripple-init
                  onClick={() =>
                    handleSubmit(item?.name, item?.description, item?._id)
                  }
                  data-te-ripple-color="light"
                >
                 + Create Application
                </button>
              </div>
            );
          })}

        {
          processes && processes.length == 0 && (
            <div className="flex col-span-3 flex-col justify-center items-center w-[100%] mt-[1rem]">
              <p className="font-semibold">No Processes Assigned to You</p>
              <p>Please contact Admin to get access of processes</p>
            </div>)
        }
      </div>
    </DashboardLayout>
  );
};

export default Youritems;
