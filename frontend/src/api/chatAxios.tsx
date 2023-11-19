import axios, { AxiosInstance } from "axios";

const chatAxiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.anafine.com/chat",
});

export default chatAxiosInstance;
