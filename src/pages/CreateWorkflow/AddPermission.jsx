import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "../../components/Form/Switch";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { processapi } from "../../apis/Process/Process";
import { ToastContainer, toast } from "react-toastify";

const approvalTypeMap = {
  "Configure your workflow": "create",
  "Approval Step": "approval",
  "Input Step": "input",
};

const AddPermission = () => {
  const location = useLocation();

  const [data, setData] = useState(location?.state?.data);

  const [tab, setTab] = useState(0);

  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);

  const [approvers, setApprovers] = useState([]);
  const [profile, setProfile] = useState({});

  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const permissions = {
    hidden: "hidden",
    editable: "editable",
    readOnly: "read-only",
  };

  const change = async () => {
    let newApprovers = JSON.parse(JSON.stringify(approvers)); // create a deep copy of the original array to avoid mutating it
    console.log(newApprovers);
    newApprovers.forEach((item, index) => {
      item.access.forEach((accessItem) => {
        accessItem.tab = index;
      });
    });

    console.log(newApprovers);
    setApprovers(newApprovers);
  };

  let approverData;
  useEffect(() => {
     approverData = localStorage.getItem("approvers")
      ? JSON.parse(localStorage.getItem("approvers"))
      : [];
  }, []);

  useEffect(() => {
    const sectionData = localStorage.getItem("sections")
      ? JSON.parse(localStorage.getItem("sections"))
      : [];
    const formData = localStorage.getItem("fields")
      ? JSON.parse(localStorage.getItem("fields"))
      : [];

    const profileData = localStorage.getItem("process")
      ? JSON.parse(localStorage.getItem("process"))
      : {};

    setSections(sectionData);
    setFields(formData);
    setProfile(profileData);

    const arr = [];
    for (const i of formData) {
      const obj = {
        id: i.id,
        section_id: i.section_id,
        permission: permissions.editable,
      };
      arr.push(obj);
    }

    const arr2 = [...approverData];

    for (const i of arr2) {
      i.access = arr;
    }
    let newApprovers = [...arr2];
    try {
      newApprovers = JSON.parse(JSON.stringify(arr2)); // create a deep copy of the original array to avoid mutating it

      newApprovers.forEach((item, index) => {
        item.access.forEach((accessItem) => {
          accessItem.tab = index;
        });
      });
      console.log("Modified", newApprovers);
    } catch (err) {
      console.log(err);
    }
    setApprovers(newApprovers);
  }, [data]);

  const handleSubmit = async () => {
    const arr = [];

    for (const i of approvers) {
      const obj = {
        access_to_all: i.accessToAll,
        title: i.title,
        type_of_approval: approvalTypeMap[i.type],
        users: i?.users,
        hidden_fields: [
          ...i?.access
            ?.filter((s) => s.permission == "hidden")
            .map((s) => s.id),
        ],

        read_only_field: [
          ...i?.access
            ?.filter((s) => s.permission == "read-only")
            .map((s) => s.id),
        ],

        editable_fields: [
          ...i?.access
            ?.filter((s) => s.permission == "editable")
            .map((s) => s.id),
        ],
      };
      arr.push(obj);
    }

    const newArr = [...sections];


    // const newFields = fields?.map((item) => {
    //   item.options = item?.options?.map((item1) => item1?.value || "") || [];
    //   delete item.type;
    //   return item;
    // });

    console.log(fields);

    newArr.map((i, key) => {
      i.description = "";
      delete i.priority;
      i.fields = fields?.filter((f) => {
        if (f.section_id == i.id) {
          delete f.section_id;
          return f;
        }
      });

      delete i.id;
    });

    const info = {
      ...profile,
      description: profile?.description,
      section: newArr,
      approvals: arr,
    };
    try {
      //   setLoading(true);
      let data = await processapi.addprocesses(info);
      console.log(data);
      if (data.success) {
        toast.success("Succesfully Added Process !");
        navigate(ROUTES.getProcess);
      }
    } catch (err) {
      toast.error("Something went wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <ToastContainer />
        <div className="p-4 grid grid-cols-4 gap-4">
          <div className="col-span-1 shadow-card p-3 py-6 flex flex-col gap-6">
            {approvers?.map((i, key) => (
              <div
                onClick={() => {
                  // console.log(key),
                   setTab(key);
                }}
                key={key}
                className={`hover:bg-blue-500 p-2 rounded-lg cursor-pointer hover:text-white ${
                  key == tab ? "bg-blue-500 text-white" : ""
                }`}
              >
                <div className="text-lg hover:text-white">{i.title}</div>
                <div className="text-sm ">{i.type}</div>
              </div>
            ))}
          </div>
          <div className="col-span-3 shadow-card p-3">
            {sections?.map((i, key) => (
              <section key={key} className="p-3 border mb-3">
                <div className="text-xl font-medium mb-10 grid grid-cols-">
                  {i.title}
                </div>

                <div className="container"></div>
                <div className="flex flex-col gap-3">
                  {fields
                    ?.filter((s) => s.section_id === i.id)
                    .map((j, key2) => (
                      <div className="mb-3 grid sm:grid-cols-6 items-center">
                        <div className="col-span-4">
                          {key2 + 1}. {j.title}
                        </div>
                        <div className="col-span-2 flex gap-3 flex-wrap">
                          <button
                            onClick={() => {
                              console.log(tab);
                              for (const iterator of approvers[tab].access) {
                                if (
                                  iterator.id == j.id &&
                                  iterator.section_id == j.section_id &&
                                  iterator.tab == tab
                                ) {
                                  iterator.permission = permissions.editable;
                                  setFlag((prev) => !prev);
                                  console.log(approvers[tab].access);
                                  break;
                                }
                              }
                            }}
                            className={`hover:bg-green-500 hover:text-neutral-100 rounded p-1 px-3 ${
                              approvers[tab]?.access.find(
                                (s) =>
                                  s.id == j.id &&
                                  s.section_id == j.section_id &&
                                  s.tab == tab &&
                                  s.permission == permissions.editable
                              )
                                ? "bg-green-500 text-neutral-100"
                                : ""
                            }`}
                          >
                            Editable
                          </button>
                          <button
                            onClick={() => {
                              for (const iterator of approvers[tab].access) {
                                if (
                                  iterator.id == j.id &&
                                  iterator.section_id == j.section_id &&
                                  iterator.tab == tab
                                ) {
                                  iterator.permission = permissions.readOnly;
                                  break;
                                }
                                console.log(approvers[tab].access);
                              }
                              setFlag((prev) => !prev);
                            }}
                            className={`hover:bg-orange-500 hover:text-neutral-100 rounded p-1 px-3 ${
                              approvers[tab]?.access.find(
                                (s) =>
                                  s.id == j.id &&
                                  s.section_id == j.section_id &&
                                  s.tab == tab &&
                                  s.permission == permissions.readOnly
                              )
                                ? "bg-orange-500 text-neutral-100"
                                : ""
                            }`}
                          >
                            Read Only
                          </button>
                          <button
                            onClick={() => {
                              for (const iterator of approvers[tab].access) {
                                if (
                                  iterator.id == j.id &&
                                  iterator.section_id == j.section_id &&
                                  iterator.tab == tab
                                )
                                  iterator.permission = permissions.hidden;
                                console.log(approvers[tab].access);
                              }
                              setFlag((prev) => !prev);
                            }}
                            className={`hover:bg-red-500 hover:text-neutral-100 rounded p-1 px-3 ${
                              approvers[tab]?.access.find(
                                (s) =>
                                  s.id == j.id &&
                                  s.section_id == j.section_id &&
                                  s.tab == tab &&
                                  s.permission == permissions.hidden
                              )
                                ? "bg-red-500 text-neutral-100"
                                : ""
                            }`}
                          >
                            Hidden
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="relative ">
          <div className="footer border-[1px] max-width-[100%] md:w-[80%] w-[100%] fixed bottom-0 shadow-md bg-[#fff] right-[0px] ">
            <div className="flex justify-between gap-[10px] p-[10px]">
              <button
                className=" border-[1px] border-[#000] text-black font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  navigate(ROUTES.AddApprovers);
                }}
              >
                Back
              </button>

              <button
                className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddPermission;
