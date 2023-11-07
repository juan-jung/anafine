import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://www.anafine.com/api`,
});

export default axiosInstance;
