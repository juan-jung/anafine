import axiosInstance from "pages/axios";

const hanlderCategoryDetail = async (id: string) => {
  console.log("hanlderCategoryDetail");

  const serverUrl = `/category/large/${id}`;

  try {
    const response = await axiosInstance.get(serverUrl);
    return response.data;
  } catch (error) {
    console.error("병원 상세정보를 불러오던 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default hanlderCategoryDetail;
