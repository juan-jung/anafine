import chatAxiosInstance from "api/chatAxios";
interface ResponseType {
  cause: any;
  disease: any;
  recommended_tests: any;
}

const handlerChatBot = async (
  sex: string,
  age: string,
  pain_area: string,
  symptoms: string
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
    const response = await chatAxiosInstance.post(serverUrl, data);

    const result: ResponseType = {
      cause: response.data.cause,
      disease: response.data.disease,
      recommended_tests: response.data.recommended_tests,
    };
    return result;
  } catch (error) {
    console.error("요청을 보내는 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export default handlerChatBot;
