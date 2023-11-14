import axiosInstance from "../api/axios";

const handlerChatBot = async (
  sex: string,
  age: string,
  pain_area: string,
  symptoms: string,
): Promise<ResponseType> => {
  console.log("handlerChatBot");

  const data = {
    sex: sex,
    age: age,
    pain_area: pain_area,
    symptoms: symptoms,
  };

  const serverUrl = "/chat/chatbot";

  try {
    const response = await axiosInstance.post(serverUrl, data);
    return response.data;
  } catch (error) {
    console.error("요청을 보내는 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default handlerChatBot;
