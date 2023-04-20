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
}