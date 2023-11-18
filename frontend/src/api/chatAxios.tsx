import axios, { AxiosInstance } from "axios";

const chatAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export default chatAxiosInstance;
