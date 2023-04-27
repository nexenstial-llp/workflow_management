import React from "react";
import { useEffect, useState } from "react";
import { applicationapi } from "../../apis/Application/Applicationapi";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import TextArea from "../../components/Form/TextArea";
import Input from "../../components/Form/Input";
import EditableLabel from "../../components/Form/EditableLabel";
import DatePicker from "../../components/Form/DatePicker";
import TimePicker from "../../components/Form/TimePicker";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";
import { processapi } from "../../apis/Process/Process";

const Formedit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [pid, setPid] = useState("");
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
    try {
      let data = await processapi.getprocessbyId(id);
      if (data.success) {
        setPid(data.data._id);
        setProcess({
          ...process,
          name: data.data.name,
          description: data.data.description,
        });
        setData(data.data.approvals);
        setSections(data.data.section);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };


  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    // for (var i = 0; i < sections.length; i++) {
    //   for (var j = 0; j < sections[i].fields.length; j++) {
    //     if (
    //       sections[i].fields[j].required == true &&
    //       sections[i].fields[j].value == undefined 
    //       && 
    //     ) {
    //       toast.error("All Fields are required !", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //       return;
    //     }
    //   }
    // }

    const info = {
      name: process.name,
      description: process.description,
      section: sections,
      approvals: data,
      process_id: pid,
    };

    try {
      let data = await applicationapi.addprocesses(info);
      if (data.success) {
        toast.success("Succesfully Added Application Form !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/yourApplications');
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  let status = [],
    status1 = [];

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className="mb-[300px]">
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
                        status = [];
                        for (let index = 0; index < data.length; index++) {
                          for (
                            let j = 0;
                            j < data[index].hidden_fields.length;
                            j++
                          ) {
                            if (
                              data[index].hidden_fields[j] ==
                              item1?.id.toString()
                            ) {
                              status.push(data[index].hidden_fields[j]);
                              break;
                            }
                          }
                          if (status.length !== 0) {
                            break;
                          }
                        } // Accessing the hidden_fields property of the first object in data array if it exists
                        // Returning the matching id in a new array
                        status1 = [];
                        for (let index = 0; index < data.length; index++) {
                          for (
                            let j = 0;
                            j < data[index].read_only_field.length;
                            j++
                          ) {
                            if (
                              data[index].read_only_field[j] ==
                              item1?.id.toString()
                            ) {
                              status1.push(data[index].read_only_field[j]);
                              break;
                            }
                          }
                          if (status1.length !== 0) {
                            break;
                          }
                        }
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
                                <select
                                  className="b-[1px]"
                                  onChange={(e) => {
                                    item1.value = e.target.value;
                                    setFlag((prev) => !prev);
                                  }}
                                >
                                  <option value="">Select</option>
                                  {item1?.options.map((k, key3) => (
                                    <option value={k.value}>{k}</option>
                                  ))}
                                </select>
                              </div>
                            ) : item1?.type_of_field == types.select ? (
                              <div
                                className={`flex flex-col ${
                                  status[0] === item1?.id.toString()
                                    ? `hidden`
                                    : ""
                                }`}
                              >
                                <select
                                  onChange={(e) => {
                                    item1.value = e.target.value;
                                    setFlag((prev) => !prev);
                                  }}
                                >
                                  <option>Select</option>
                                  {item1?.options.map((k, key3) => (
                                    <option value={k.value}>{k}</option>
                                  ))}
                                </select>
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
                {/* <button
                  className=" border-[1px] border-[#000] text-black font-semibold rounded-[8px] px-[20px] py-[10px]"
                  onClick={(e) => {
                    navigate(ROUTES.CreateProcess);
                  }}
                >
                  Back
                </button> */}

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
