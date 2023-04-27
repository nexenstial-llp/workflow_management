import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/Partials/Modal";
import { Dropdown, Select, Space } from "antd";
import Switch from "../../components/Form/Switch";
import EditableLabel from "../../components/Form/EditableLabel";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { userApi } from "../../apis/User/User";
import { processapi } from "../../apis/Process/Process";
import { ToastContainer, toast } from "react-toastify";
const { Option } = Select;

const approvalTypeMap = {
  "Configure your workflow": "create",
  "Approval Step": "approval",
  "Input Step": "input",
};

const AddApprovers = () => {
  //Modal Options
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  let id = searchParams.get("id");

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleOkModal = () => {
    setIsModalOpen(false);
    const arr = [...approvers];
    arr[editKey] = editData;
    setApprovers(arr);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const types = {
    creater: "Configure your workflow",
    approver: "Approval Step",
    input: "Input Step",
  };

  //Initial data
  // const options = [
  //   {
  //     label: "srinivas@nexenstial.com",
  //     value: "srinivas",
  //   },
  //   {
  //     label: "guru@nexenstial.com",
  //     value: "guru",
  //   },
  //   {
  //     label: "abhishek@nexenstial.com",
  //     value: "abhishek",
  //   },
  // ];

  const [options, setOptions] = useState([]);

  const getUsers = async () => {
    try {
      let data = await userApi.getUsers();
      console.log(data);
      if (data.success) {
        setOptions(
          data.data?.map((item) => ({ label: item.email, value: item._id }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [approvers, setApprovers] = useState([
    {
      title: "Who can start the Process",
      accessToAll: true,
      users: [],
      type: types.creater,
    },
  ]);

  const baseObj = {
    title: "New user",
    accessToAll: false,
    users: [],
  };

  const [editData, setEditData] = useState({});

  const [editKey, setEditKey] = useState();

  const [flag, setFlag] = useState(true);

  //helpers

  const appendApprover = (id, t) => {
    console.log(id);
    const arr = [...approvers];
    console.log(arr);
    const obj = {
      ...baseObj,
      type: t,
    };
    arr.splice(id + 1, 0, obj);
    console.log(arr);
    setApprovers(arr);
  };

  //Hooks
  const location = useLocation();


  const navigate = useNavigate();

  //Helper Function
  const handleChange = (value) => {
    console.log(value);
    setEditData((prev) => ({
      ...prev,
      users: value,
    }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    localStorage.setItem("approvers", JSON.stringify(approvers));

    const newData = approvers.map((item) => {
      return {
        access_to_all: item.accessToAll,
        title: item.title,
        type_of_approval: approvalTypeMap[item.type],
        users: item.users,
      };
    });

    console.log("newData",newData);
    navigate(`${ROUTES?.AddPermission}`);
  };

  useEffect(() => {
    const data = localStorage.getItem("approvers");
    if (data) {
      setApprovers(JSON.parse(data));
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="AddApprovers min-h-screen min-w-screen pb-[200px]">
        <ToastContainer />
        <Modal
          title={editData.title}
          isModalOpen={isModalOpen}
          handleCancel={handleCancelModal}
          handleOk={handleOkModal}
        >
          <div className="flex items-center gap-3 my-3 mt-5">
            Mark all
            <Switch
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, accessToAll: e }));
                if (e) {
                  setEditData((prev) => ({
                    ...prev,
                    users: [],
                  }));
                }
              }}
              checked={editData.accessToAll}
              className={"bg-[#000]"}
            />
          </div>
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            disabled={editData.accessToAll}
            placeholder="Add  Email"
            defaultValue={[options[0]?.value]}
            onChange={handleChange}
            value={editData.users}
          >
            {options.map((i, key) => (
              <Option key={key} value={i?.value} label={i?.label}>
                {i.label}
              </Option>
            ))}
          </Select>
          <div className="flex justify-between items-center mt-7">
            <button
              onClick={handleCancelModal}
              className="border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center"
            >
              cancel
            </button>
            <button
              onClick={handleOkModal}
              className="bg-blue-600 text-neutral-100 rounded p-1 px-3"
            >
              Save
            </button>
          </div>
        </Modal>
        {/* <div className="w-full p-3 flex justify-between items-center shadow mb-5">
          <div>Add Approvars</div>
          <div className="flex gap-6 items-center">
            <button className="border border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center">
              cancel
            </button>
            <button
              onClick={() => {
                navigate(ROUTES.AddPermission, {
                  state: { data: { ...location.state.data, approvers } },
                });
              }}
              className="bg-blue-600 text-neutral-100 rounded p-1 px-3"
            >
              continue
            </button>
          </div>
        </div> */}
        {/* <div className="mb-10 sm:w-[90%] w-[95%] m-auto shadow-card border border-[1px] border-[#F2ECFF] sm:p-10 p-2">
          <div className="text-2xl font-semibold">Workflow-1</div>
          <div className='text-sm text-neutral-500'>
                    This is description
                </div>
        </div> */}

        {approvers.map((i, key) => (
          <>
            <div className="sm:w-[50%] w-[70%] m-auto shadow-card border-[1px] border-[#F2ECFF] sm:p-6 p-2 max-h-[500px] relative">
              <EditableLabel
                value={i.title}
                onChange={(e) => {
                  i.title = e.target.value;
                  setFlag((prev) => !prev);
                }}
                className="text-xl font-medium w-[100%]"
              />
              <div className="text-xsm text-neutral-500">{i?.type}</div>
              <div className="flex justify-between mt-4">
                <div className="text-sm text-neutral-700">
                  {i.accessToAll ? (
                    "Everyone"
                  ) : (
                    <ol>
                      {i?.users.length != 0
                        ? i?.users.map((j, key2) => (
                            <li>
                              {options?.find((s) => s?.value == j)?.label}
                            </li>
                          ))
                        : "No user added"}
                    </ol>
                  )}
                </div>
                <div className="w-[140px]">
                  <button
                    onClick={() => {
                      handleOpenModal();
                      setEditKey(key);
                      setEditData(i);
                    }}
                    className="w-full btn btn-danger text-neutral-100 rounded p-1 px-3"
                  >
                    Assigned to
                  </button>
                </div>
              </div>

              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <div
                          onClick={() => {
                            appendApprover(key, types.input);
                          }}
                        >
                          Input Step
                        </div>
                      ),
                      key: "0",
                    },
                    {
                      label: (
                        <div
                          onClick={() => {
                            appendApprover(key, types.approver);
                          }}
                        >
                          Approval Step
                        </div>
                      ),
                      key: "1",
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <button className="absolute bottom-[6px] left-[45%] btn btn-success text-neutral-100 rounded p-1 px-3">
                  Add +
                </button>
              </Dropdown>
            </div>
            {key + 1 == approvers.length ? null : (
              <div className="w-[1px] m-auto h-[100px] bg-neutral-500"></div>
            )}
          </>
        ))}

        <div className="relative ">
          <div className="footer border-[1px] max-width-[100%] md:w-[80%] w-[100%] fixed bottom-0 shadow-md bg-[#fff] right-[0px] ">
            <div className="flex justify-between gap-[10px] p-[10px]">
              <button
                className=" border-[1px] border-[#000] text-black font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  navigate(ROUTES.CreateForm);
                }}
              >
                Back
              </button>

              <button
                className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddApprovers;
