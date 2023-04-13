import { api } from "../config/axiosConfig.js";
import { defineCancelApiObject } from "../config/axiosUtils";

export const userApi = {
  addUsers: async (data, cancel = false) => {
    const response = await api.request({
      url: "api/user/signup",
      method: "POST",
      data: data,
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });
    console.log(response.data);
    return response.data;
  },

  getUsers: async (queries, cancel = false) => {
    const response = await api.request({
      url: "api/user/admin/users",
      method: "GET",
      signal: cancel
        ? defineCancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });
    console.log(response.data);
    return response.data;
  },
};
