import { api } from "../config/axiosConfig.js";
import { defineCancelApiObject } from "../config/axiosUtils";

export const authAPI = {
  postlogin: async (login, cancel = false) => {
    const response = await api.request({
      url: "api/user/login",
      method: "POST",
      data: login,
      signal: cancel ? defineCancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
    });

    return response.data;
  },
};
