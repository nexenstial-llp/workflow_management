import React from "react";
import { processapi } from "../../apis/Process/Process";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useParams, useSearchParams } from "react-router-dom";
const Formedit = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);
  let id = params.id;

  const getData = async () => {
    let data = await processapi.getprocessbyId(id);
    if (data.success) {
      console.log(data);
      setSections(data.sections);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <DashboardLayout>
      <div>Formedit</div>
    </DashboardLayout>
  );
};

export default Formedit;
