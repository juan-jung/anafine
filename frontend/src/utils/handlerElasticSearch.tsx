import axiosInstance from "pages/axios";

const handlerElasticSearch = async (text: string) => {
  console.log("handlerElasticSearch");

  const serverUrl = "/search/recommend";

  const queryParams = `?text=${text}`;

  try {
    const response = await axiosInstance.get(serverUrl + queryParams);
    return response.data;
  } catch (error) {
    console.error("검색 결과를 불러오는 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default handlerElasticSearch;
