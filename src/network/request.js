import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,
  });
  //拦截器
  instance.interceptors.response.use(
    (res) => {
      // console.log("响应拦截");
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
}
