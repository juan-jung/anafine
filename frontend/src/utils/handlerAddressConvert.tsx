import axiosInstance from "../api/axios";

const handlerAddressConvert = async (latitude: number, longitude: number) => {
  console.log("handlerAddressConvert");

  const serverUrl = `/address/convert`;
  const queryParams = `?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await axiosInstance.get(serverUrl + queryParams);

    return response.data.documents[0];
  } catch (error) {
    console.error("주소 변환에 오류가 발생했습니다.", error);
    throw error;
  }
};

export default handlerAddressConvert;
