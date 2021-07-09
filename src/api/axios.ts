import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

//拦截器-请求拦截
instance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      config.headers = {
        userId,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//拦截器-响应拦截
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//整体导出
export default instance;
