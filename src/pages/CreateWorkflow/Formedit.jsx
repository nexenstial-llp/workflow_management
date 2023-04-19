import React from "react";
import { processapi } from "../../apis/Process/Process";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//react-icons
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

//components
import TextArea from "../../components/Form/TextArea";
import Input from "../../components/Form/Input";
import EditableLabel from "../../components/Form/EditableLabel";
import CheckBox from "../../components/Form/CheckBox";
import Select from "../../components/Form/Select";
import Radio from "../../components/Form/Radio";
import DatePicker from "../../components/Form/DatePicker";
import TimePicker from "../../components/Form/TimePicker";
import Switch from "../../components/Form/Switch";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";

const Formedit = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  let id = params.id;
  const [process, setProcess] = useState({
    name: "",
    description: "",
  });

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
    currency: "currency",
  };

  const getData = async () => {
    let data = await processapi.getprocessbyId(id);
    if (data.success) {
      setProcess({
        ...process,
        name: data.data.name,
        description: data.data.description,
      });
      setData(data.data.approvals);
      setSections(data.data.section);
    }
  };

  console.log(sections);

  useEffect(() => {
    getData();
  }, []);


  const handleSubmit = () => {
    console.log(sections[0].fields);
  };

  let status, status1;

  return (
    <DashboardLayout>
    <ToastContainer />
      <div>
        <div className="sm:w-[90%] w-[95%] m-auto shadow-card border-[1px] border-[#F2ECFF] sm:p-10 p-2">
          <div className="text-2xl font-semibold">{process.name}</div>
          <div className="text-sm">{process.description}</div>
          {sections &&
            sections?.map((item, key) => {
              return (
                <section
                  key={key}
                  className="section border-[1px] border-b-2 p-2 mt-10 transition-all"
                >
                  <div className="text-2xl font-semibold">{item.title}</div>
                  <div className="text-sm">{item.description}</div>
                  {item?.fields &&
                    item?.fields.map((item1, key) => {
                      {
                        status = data[0]?.hidden_fields // Accessing the hidden_fields property of the first object in data array if it exists
                          ?.filter((s) => s === item1?.id.toString()) // Filtering the array to find the matching id with item1
                          .map((item) => {
                            return item;
                          }); // Returning the matching id in a new array
                        status1 = data[0]?.read_only_field
                          ?.filter((s) => s === item1?.id.toString())
                          .map((item) => {
                            return item;
                          });
                      }
                      return (
                        <div
                          className={`input-fields-holder my-[3rem] flex flex-col gap-0.5 w-full`}
                        >
                          <div
                            className={`flex gap-[0.3rem] flex-row w-full bg-transparent ${
                              status[0] === item1?.id.toString() ? `hidden` : ""
                            }`}
                          >
                            {item1.required === true ? (
                              <p className="text-red-500">*</p>
                            ) : null}
                            <EditableLabel
                              name="field"
                              readOnly={true}
                              value={item1?.title}
                              className="bg-transparent w-full"
                            />
                          </div>
                          <div className="my-[1rem] w-full">
                            {item1?.type_of_field === types.shortAnswer ? (
                              <Input
                                value={item1?.value}
                                name="shortans"
                                type="text"
                                className={`w-full ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                                readOnly={
                                  status1[0] === item1?.id.toString()
                                    ? true
                                    : null
                                }
                                onChange={(e) => {
                                  item1.value = e.target.value;
                                  setFlag((prev) => !prev);
                                }}
                                placeholder={item1?.placeHolder}
                              />
                            ) : item1?.type_of_field === types.longAnswer ? (
                              <TextArea
                                value={item1?.value}
                                name="longans"
                                readOnly={
                                  status1[0] === item1?.id.toString()
                                    ? true
                                    : null
                                }
                                placeholder={item?.placeHolder}
                                onChange={(value) => {
                                  item1.value = value;
                                  setFlag((prev) => !prev);
                                }}
                                className={`h-auto ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                              />
                            ) : item1?.type_of_field === types.currency ? (
                              <Input
                                value={item1?.value}
                                name="currency"
                                readOnly={status1.length !== 0 ? true : null}
                                className={`w-full ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                                onChange={(e) => {
                                  item1.value = e.target.value;
                                  setFlag((prev) => !prev);
                                }}
                                placeholder={item?.placeHolder}
                              />
                            ) : item1?.type_of_field === types.date ? (
                              <DatePicker
                                value={item1?.placeHolder.split("T")[0]}
                                yes={
                                  status1[0] === item1?.id.toString()
                                    ? true
                                    : null
                                }
                                className={`w-full ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                                onChange={(value) => {
                                  item1.value = value.$d;
                                  setFlag((prev) => !prev);
                                }}
                              />
                            ) : item1?.type_of_field === types.time ? (
                              <TimePicker
                                yes={
                                  status1[0] === item1?.id.toString()
                                    ? true
                                    : null
                                }
                                value={item1?.placeHolder.substring(11, 19)}
                                className={`w-full ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                                onChange={(value) => {
                                  item1.value = value.$d;
                                  setFlag((prev) => !prev);
                                }}
                              />
                            ) : item1?.type_of_field === types.numeric ? (
                              <Input
                                value={item1?.value}
                                name="numeric"
                                type="number"
                                readOnly={
                                  status1[0] === item1?.id.toString()
                                    ? true
                                    : null
                                }
                                className={`w-full ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                                onChange={(e) => {
                                  item1.value = e.target.value;
                                  setFlag((prev) => !prev);
                                }}
                              />
                            ) : item1?.type_of_field == types.checkBox ? (
                              <div
                                className={`flex flex-col ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                              >
                                {item1?.options.map((k, key3) => (
                                  <div
                                    key={key3}
                                    className={`flex item-center mt-2 w-full`}
                                  >
                                    <div className="sm:w-[100px] w-[50%]">
                                      Option {key3 + 1} :
                                    </div>{" "}
                                    <EditableLabel
                                      className={`bg-nuetral-500 border-b-[1px] border-blue-400 w-full`}
                                      readOnly={
                                        status1[0] === item1?.id.toString()
                                          ? true
                                          : null
                                      }
                                      value={k.value}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        k.value = e.target.value;
                                        setFlag((prev) => !prev);
                                      }}
                                    />{" "}
                                  </div>
                                ))}
                              </div>
                            ) : item1?.type_of_field == types.select ? (
                              <div
                                className={`flex flex-col ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                              >
                                {item1?.options.map((k, key3) => (
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
                                      readOnly={
                                        status1[0] === item1?.id.toString()
                                          ? true
                                          : null
                                      }
                                      value={k.value}
                                      onChange={(e) => {
                                        k.value = e.target.value;
                                        setFlag((prev) => !prev);
                                      }}
                                    />{" "}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                </section>
              );
            })}
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Formedit;
