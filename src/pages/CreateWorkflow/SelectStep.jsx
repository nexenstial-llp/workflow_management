import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";

const SelectStep = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div>
        <div className="container m-auto sm:p-5 p-3 mt-5">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ marginTop: "150px" }}
          >
            <div className="col-md-4">
              <div
                className="card rounded-lg cursor-pointer shadow-sm mb-3"
                onClick={() => {
                  navigate(ROUTES.CreateProcess);
                }}
              >
                <div className="card-body p-3">
                  <div class="d-flex bd-highlight">
                    <div class="p-2 bd-highlight">
                      {" "}
                      <i
                        class="ri-git-merge-line"
                        style={{ color: "green", fontSize: "20px" }}
                      ></i>{" "}
                    </div>
                    <div class="p-2 bd-highlight">Process</div>
                    <div class="ml-auto p-2 bd-highlight">
                      <i class="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card rounded-lg cursor-pointer shadow-sm mb-3">
                <div className="card-body p-3">
                  <div class="d-flex bd-highlight">
                    <div class="p-2 bd-highlight">
                      {" "}
                      <i
                        class="ri-dashboard-fill"
                        style={{ color: "orange", fontSize: "20px" }}
                      ></i>{" "}
                    </div>
                    <div class="p-2 bd-highlight">Board</div>
                    <div class="ml-auto p-2 bd-highlight">
                      <i class="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card rounded-lg cursor-pointer shadow-sm">
                <div className="card-body p-3">
                  <div class="d-flex bd-highlight">
                    <div class="p-2 bd-highlight">
                      {" "}
                      <i
                        class="ri-database-2-fill"
                        style={{ color: "red", fontSize: "20px" }}
                      ></i>{" "}
                    </div>
                    <div class="p-2 bd-highlight">Dataset</div>
                    <div class="ml-auto p-2 bd-highlight">
                      <i class="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelectStep;
