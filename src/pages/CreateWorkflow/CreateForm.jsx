import React, { useEffect, useState } from "react";
import EditableLabel from "../../components/Form/EditableLabel";
import { Dropdown } from "antd";
import Input from "../../components/Form/Input";
import { processapi } from "../../apis/Process/Process";
import { useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Icons
import { BsCurrencyRupee, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import {
  AiOutlineAlignLeft,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineCheckSquare,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdShortText } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { TbNumbers } from "react-icons/tb";
import { RxDropdownMenu } from "react-icons/rx";
import { BiTime } from "react-icons/bi";

// Components
import TextArea from "../../components/Form/TextArea";
import CheckBox from "../../components/Form/CheckBox";
import Select from "../../components/Form/Select";
import Radio from "../../components/Form/Radio";
import DatePicker from "../../components/Form/DatePicker";
import TimePicker from "../../components/Form/TimePicker";
import Switch from "../../components/Form/Switch";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const CreateForm = () => {
  //Hooks
  const navigate = useNavigate();

  const params = useParams();
  const [searchParams] = useSearchParams();

  let id = searchParams.get("id");

  //Declaring string in variables to avoid typos
  const types = {
    shortAnswer: "short",
    longAnswer: "long",
    numeric: "number",
    checkBox: "check",
    radio: "radio",
    select: "select",
    multiselect: "multi-select",
    date: "date",
    time: "time",
    curreny: "currency",
    // doc:'document'
  };

  //All useState Details

  const [title, setTitle] = useState("");

  let process_name = JSON.parse(localStorage.getItem("process"));

  const typesArr = [
    {
      name: types.shortAnswer,
      icon: <MdShortText />,
    },
    {
      name: types.longAnswer,
      icon: <AiOutlineAlignLeft />,
    },
    {
      name: types.numeric,
      icon: <TbNumbers />,
    },
    {
      name: types.checkBox,
      icon: <AiOutlineCheckSquare />,
    },
    {
      name: types.select,
      icon: <RxDropdownMenu />,
    },
    {
      name: types.date,
      icon: <AiOutlineCalendar />,
    },
    {
      name: types.time,
      icon: <BiTime />,
    },
    {
      name: types.curreny,
      icon: <BsCurrencyRupee />,
    },
  ];

  const [openForEdit, setOpenForEdit] = useState();

  const [sections, setSections] = useState([
    {
      title: "Section ",
      id: 1,
      priority: 1,
    },
  ]);

  const initialField = {
    title: "Field",
    type: types.shortAnswer,
    placeHolder: "Enter Your Answer",
    options: [
      {
        id: 1,
        value: "Option 1",
      },
    ],
    required: true,
  };

  const [fields, setFields] = useState([
    {
      id: 1,
      section_id: 1,
      ...initialField,
    },
  ]);

  //For refreshing the component
  const [flag, setFlag] = useState(false);

  ////////////////////////////////////////////////////
  //Helping functions to add functionality in the form
  ////////////////////////////////////////////////////

  const generateRandomNumber = () => Math.floor(Math.random() * 90000) + 10000;

  //This fnction adds new input field
  const addField = (section_id) => {
    const arr = [...fields];
    const obj = {
      id: Math.floor(Math.random() * 90000) + 10000,
      section_id: section_id,
      ...initialField,
    };

    arr.push(obj);

    setFields(arr);
  };

  //Function to delete Field
  const deleteField = (field) => {
    const arr = fields.filter((s) => s.id != field.id);
    setFields(arr);
  };

  //This fnction adds new Section
  const addSection = (priority) => {
    const id = generateRandomNumber();
    const arr = [...sections];
    const arr2 = [...fields];
    const obj = {
      id: id,
      priority: priority,
      title: "New Section ",
    };

    const obj2 = {
      id: Math.floor(Math.random() * 90000) + 10000,
      section_id: id,
      ...initialField,
    };
    arr2.push(obj2);
    arr.push(obj);

    setFields(arr2);
    setSections(arr);
  };

  const deleteSection = (section_id) => {
    if (sections.length == 1) return alert("Atleas one section is required");
    const arr = sections.filter((s) => s.id != section_id);
    setSections(arr);
  };

  const save = () => {
    setOpenForEdit();
  };

  const handleSubmit = async () => {
    const newFields = [...fields];
    newFields.map((item) => {
      item.options = item?.options?.map((item1) => item1?.value || "") || [];
      item.type_of_field = item.type;
      return delete item.type;
    });

    const newsections = [...sections];
    newsections.map((item) => {
      const newfields = fields?.filter((s) => {
        if (item.id === s.section_id) {
          return s;
        }
      });
      item.fields = newfields;
    });

    localStorage.setItem("sections", JSON.stringify(newsections));
    localStorage.setItem("fields", JSON.stringify(newFields));

    const data = localStorage.getItem("sections");
    const data2 = localStorage.getItem("fields");
    if (data) {
      setSections(JSON.parse(data));
    }
    if (data2) {
      setFields(JSON.parse(data2));
    }
    navigate(`${ROUTES?.AddApprovers}?id=${id}`);
  };

  useEffect(() => {
    localStorage.getItem("sections") &&
      setSections(JSON.parse(localStorage.getItem("sections")));
    localStorage.getItem("fields") &&
      setFields(JSON.parse(localStorage.getItem("fields")));
  }, []);

  return (
    <DashboardLayout>
      <div className="CreateForm min-h-screen min-w-screen mb-[100px]">
        <div className="sm:w-[90%] w-[95%] m-auto shadow-card border-[1px] border-[#F2ECFF] sm:p-10 p-2">
          <div className="text-2xl font-semibold">{process_name.name}</div>
          <div className="text-sm">{process_name.description}</div>
          <hr />
          <div className="flex flex-col gap-[20px]">
            {sections.map((i, key) => (
              <section
                key={key}
                className="section border-[1px] border-b-2 p-2 mt-10 transition-all"
              >
                <div className="flex">
                  <EditableLabel
                    className="text-xl font-medium w-full duration-500"
                    style={{ wordWrap: "break-word" }}
                    value={i.title}
                    name="title"
                    onChange={(e) => {
                      i.title = e.target.value;
                      setFlag((prev) => !prev);
                      setTitle(e.target.value);
                    }}
                  />
                  <div
                    onClick={() => {
                      deleteSection(i.id);
                    }}
                    className="bg-red-100 p-2 ml-2 cursor-pointer rounded"
                  >
                    <BsTrash className="text-red-500" />
                  </div>
                </div>
                {fields
                  .filter((s) => s.section_id == i.id)
                  .map((j, key2) => (
                    <div
                      className={`form-holder mt-5 p-4 rounded-lg transition-all ${
                        openForEdit == j.id ? "shadow-card" : ""
                      }`}
                      key={key2}
                    >
                      <div className="form-item flex gap-3">
                        <div className="input-fields-holder flex flex-col gap-0.5 w-full">
                          <EditableLabel
                            name="field"
                            className="bg-white"
                            onChange={(e) => {
                              j.title = e.target.value;
                              setFlag((prev) => !prev);
                            }}
                            value={j.title}
                          />
                          {j.type == types.longAnswer ? (
                            <TextArea
                              value={j.placeHolder}
                              name="longans"
                              onChange={(value) => {
                                j.placeHolder = value;
                                setFlag((prev) => !prev);
                              }}
                              className={"h-auto"}
                            />
                          ) : j.type == types.shortAnswer ? (
                            <Input
                              value={j.placeHolder}
                              name="shortans"
                              type="text"
                              onChange={(e) => {
                                j.placeHolder = e.target.value;
                                setFlag((prev) => !prev);
                              }}
                              placeholder={j.placeHolder}
                            />
                          ) : j.type == types.numeric ? (
                            <Input
                              type="number"
                              name="numeric"
                              value={j.placeHolder}
                              onChange={(e) => {
                                j.placeHolder = e.target.value;
                                setFlag((prev) => !prev);
                              }}
                              placeholder={j.placeHolder}
                            />
                          ) : j.type == types.checkBox ? (
                            <div className="flex flex-col">
                              {j.options.map((k, key3) => (
                                <div
                                  key={key3}
                                  className="flex item-center mt-2 w-full"
                                >
                                  <div className="sm:w-[100px] w-[50%]">
                                    Option {key3 + 1} :
                                  </div>{" "}
                                  <EditableLabel
                                    className={
                                      "bg-nuetral-500 border-b-[1px] border-blue-400 w-full"
                                    }
                                    value={k.value}
                                    onChange={(e) => {
                                      k.value = e.target.value;
                                      setFlag((prev) => !prev);
                                    }}
                                  />{" "}
                                  <div
                                    onClick={() => {
                                      j.options = j.options.filter(
                                        (s) => s.id != k.id
                                      );
                                      setFlag((prev) => !prev);
                                    }}
                                    className="bg-red-100 p-2 ml-2 cursor-pointer rounded"
                                  >
                                    <BsTrash className="text-red-500" />
                                  </div>
                                </div>
                              ))}
                              <div>
                                <button
                                  onClick={() => {
                                    const obj = {
                                      value: "Unkown Option",
                                      id: generateRandomNumber(),
                                    };
                                    j.options.push(obj);
                                    setFlag((prev) => !prev);
                                  }}
                                  className="bg-blue-600 text-neutral-100 rounded p-1 px-3 mt-4"
                                >
                                  add option
                                </button>
                              </div>
                            </div>
                          ) : j.type == types.select ? (
                            <div className="flex flex-col">
                              {j.options.map((k, key3) => (
                                <div
                                  key={key3}
                                  className="flex item-center mt-2 w-full"
                                >
                                  <div className="sm:w-[100px] w-[50%]">
                                    Option {key3 + 1} :
                                  </div>{" "}
                                  <EditableLabel
                                    className={
                                      "bg-nuetral-500 border-b-[1px] border-blue-400 w-full"
                                    }
                                    value={k.value}
                                    onChange={(e) => {
                                      k.value = e.target.value;
                                      setFlag((prev) => !prev);
                                    }}
                                  />{" "}
                                  <div
                                    onClick={() => {
                                      j.options = j.options.filter(
                                        (s) => s.id != k.id
                                      );
                                      setFlag((prev) => !prev);
                                    }}
                                    className="bg-red-100 p-2 ml-2 cursor-pointer rounded"
                                  >
                                    <BsTrash className="text-red-500" />
                                  </div>
                                </div>
                              ))}
                              <div>
                                <button
                                  onClick={() => {
                                    const obj = {
                                      value: "Unkown Option",
                                      id: generateRandomNumber(),
                                    };
                                    j.options.push(obj);
                                    setFlag((prev) => !prev);
                                  }}
                                  className="bg-blue-600 text-neutral-100 rounded p-1 px-3 mt-4"
                                >
                                  add option
                                </button>
                              </div>
                            </div>
                          ) : j.type == types.radio ? (
                            <Radio />
                          ) : j.type == types.date ? (
                            <DatePicker
                              onChange={(value) => {
                                j.placeHolder = value.$d;
                                setFlag((prev) => !prev);
                              }}
                            />
                          ) : j.type == types.time ? (
                            <TimePicker
                              onChange={(value) => {
                                j.placeHolder = value.$d;
                                setFlag((prev) => !prev);
                              }}
                            />
                          ) : (
                            <Input
                              value={j.placeHolder}
                              onChange={(e) => {
                                j.placeHolder = e.target.value;
                                setFlag((prev) => !prev);
                              }}
                              name="currency"
                              placeholder={j.placeHolder}
                            />
                          )}
                          <div
                            className={`pt-6 transition-all duration-[2000ms] overflow-hidden ${
                              openForEdit === j.id ? "" : "h-0"
                            }`}
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              {typesArr.map((k, key3) => (
                                <div
                                  onClick={() => {
                                    j.type = k.name;
                                    setFlag((prev) => !prev);
                                  }}
                                  className={`flex flex-col min-w-[100px] border  p-2 items-center justify-center gap-2 rounded-lg cursor-pointer ${
                                    k.name == j.type
                                      ? "bg-blue-800 text-neutral-50"
                                      : "border-blue-800"
                                  }`}
                                >
                                  {k.icon}
                                  <div className="text-[10px]">{k.name}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3">
                              <button
                                onClick={() => save()}
                                className="w-full border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="settings w-[100px] flex flex-col justify-center gap-4 items-center ">
                          <div className="flex items-center gap-2 text-sm">
                            <Switch
                              checked={j.required}
                              onChange={(e) => {
                                j.required = e;
                                setFlag((prev) => !prev);
                              }}
                              size="small"
                              className={"bg-neutral-400"}
                            />
                            required
                          </div>
                          <div className="cursor-pointer">
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    label: (
                                      <div
                                        className="flex gap-1 items-center"
                                        onClick={() => {
                                          setOpenForEdit(j.id);
                                        }}
                                      >
                                        <AiOutlineSetting /> Options
                                      </div>
                                    ),
                                    key: "0",
                                  },
                                  {
                                    label: (
                                      <div className="flex gap-1 items-center text-red-500">
                                        <BsTrash /> Delete
                                      </div>
                                    ),
                                    children: [
                                      {
                                        key: "2-1",
                                        label: (
                                          <div
                                            onClick={() => {
                                              deleteField(j);
                                            }}
                                            className="text-red-500"
                                          >
                                            Yes Delete it!
                                          </div>
                                        ),
                                      },
                                    ],
                                    key: "1",
                                  },
                                ],
                              }}
                              trigger={["click"]}
                            >
                              <BsThreeDotsVertical />
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="flex justify-center mt-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addField(i.id);
                      }}
                      className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px]"
                    >
                      Add field
                    </button>
                    <button
                      onClick={() => {
                        addSection(1);
                      }}
                      className="bg-[#000] ml-auto text-[#fff] font-semibold rounded-[8px] px-[20px] py-[10px]"
                    >
                      Add Section
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="footer border-[1px] max-width-[100%] md:w-[80%] w-[100%] fixed bottom-0 shadow-md bg-[#fff] right-[0px] ">
            <div className="flex justify-between gap-[10px] p-[10px]">
              <button
                className=" border-[1px] border-[#000] text-black font-semibold rounded-[8px] px-[20px] py-[10px]"
                onClick={(e) => {
                  navigate(ROUTES.CreateProcess);
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
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateForm;
