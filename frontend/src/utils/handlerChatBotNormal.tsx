import chatAxiosInstance from "api/chatAxios";

const handlerChatBotNormal = async (content: string): Promise<ResponseType> => {
  console.log("handlerChatBotNormal");

  const data = {
    message: content,
  };

  const serverUrl = "/chat/chatbot/normal";

  try {
    const response = await chatAxiosInstance.post(serverUrl, data);
    return response.data.response;
  } catch (error) {
    console.error("요청을 보내는 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default handlerChatBotNormal;
