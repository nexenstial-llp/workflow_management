import { api } from "../config/axiosConfig.js";
import { defineCancelApiObject } from "../config/axiosUtils";

export const processapi = {
  addprocesses: async (data, cancel = false) => {
    const response = await api.request({
      url: "api/process/create",
      method: "POST",
      data: data,
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getProcesses: async (queries, cancel = false) => {
    const response = await api.request({
      url: "api/process/get",
      method: "GET",
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    console.log(response.data);
    return response.data;
  },

  updateProcesses: async (id, data, cancel = false) => {
   
    const response = await api.request({
      url: `api/process/update/${id}`,
      method: "PUT",
      data:data,
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    console.log(response.data.data);
    return response.data;
  },

  getprocessbyId: async (id,cancel = false) => {
    const response = await api.request({
      url: `api/process/get/${id}`,
      method: "GET",
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },

  getprocessesforUser: async (id,cancel = false) => {
    const response = await api.request({
      url: `api/process/create/all`,
      method: "GET",
      headers:{
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
      },
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },
};
