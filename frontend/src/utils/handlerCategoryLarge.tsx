import axiosInstance from "../api/axios";

const hanlderCategoryLarge = async () => {
  console.log("hanlderCategoryLarge");

  const serverUrl = `/category/large`;

  try {
    const response = await axiosInstance.get(serverUrl);
    return response.data;
  } catch (error) {
    console.error("병원 상세정보를 불러오던 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default hanlderCategoryLarge;
