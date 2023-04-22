import { api } from "../config/axiosConfig.js";
import { defineCancelApiObject } from "../config/axiosUtils";

export const applicationapi = {
  addprocesses: async (data, cancel = false) => {
    const response = await api.request({
      url: "api/application/create",
      method: "POST",
      data: data,
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getInputrequests: async (data, cancel = false) => {
    const response = await api.request({
      url: "api/application/input",
      method: "GET",
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getApprovals: async (data, cancel = false) => {
    const response = await api.request({
      url: "api/application/approval",
      method: "GET",
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getApprovalsById: async (id, cancel = false) => {
    const response = await api.request({
      url: `api/application/get/${id}`,
      method: "GET",
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  updateApprovals: async (id,data, cancel = false) => {
    const response = await api.request({
      url: `api/application/update/${id}`,
      method: "PUT",
      data:data,
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getAllapprovals: async (cancel = false) => {
    const response = await api.request({
      url: "api/application/get",
      method: "GET",
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type':'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },
}