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
    console.error(
      alert(
        "이 IP는 서비스 이용제한 대상입니다. 이용료 결제 후 사용 바랍니다."
      ),
      "이 IP는 서비스 이용제한 대상입니다. 이용료 결제 후 사용 바랍니다.",
      error
    );
    throw error;
  }
};

export default handlerChatBot;
