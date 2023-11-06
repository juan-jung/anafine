import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.HOST_URL}`,
});

export default axiosInstance;
