import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.anafine.com/api",
});
export default axiosInstance;
