import axios from "./axios";

// 请求云盘容量
export const capacityReq = axios.get("file/capacity");

// 登录
export const loginReq = (data: any) => {
  return axios.post("user/login", data, {
    headers: { "Content-Type": "application/json" },
  });
};

// 注册
export const registerReq = (data: any) => {
  return axios.post("user/regist", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export default axios