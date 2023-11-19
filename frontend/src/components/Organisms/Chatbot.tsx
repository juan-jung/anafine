import React, { useState, useEffect, useRef } from "react";
import handlerChatBot from "utils/handlerChatBot";
import styles from "../../styles/chatbot.module.css";
import handlerChatBotNormal from "utils/handlerChatBotNormal";

const questionsDisease = [
  "성별을 알려주세요.",
  "나이를 알려주세요.",
  "통증 부위를 알려주세요.",
  "증상에 대해 알려주세요.",
];
interface DiseasePredictionPopupProps {
  onClose: () => void;
  onAgree: () => void;
}

const DiseasePredictionPopup: React.FC<DiseasePredictionPopupProps> = ({
  onClose,
  onAgree,
}) => {
  return (
    <div className={styles["popup"]}>
      <h2 style={{ textAlign: "center" }}>질병 예측 서비스 이용 약관</h2>
      <p style={{ textAlign: "left" }}>
        1. 이 서비스는 전문적인{" "}
        <span style={{ color: "red" }}>조언을 제공하는 것이 아닌 참고용</span>
        이며, 정확한 진단이나 치료 방법을 제시하지 않습니다.
        <br />
        <br />
        2. 이 서비스는 전문적인 의료 상담을 대체하지 않습니다. 자세하고{" "}
        <span style={{ color: "red" }}>
          정확한 증상을 위해 의료 전문가와 상담할 것을 강력히 권장
        </span>
        합니다.
        <br />
        <br />
        3. 사용자가 제공하는 모든 정보는 사용자에게 일반적인 정보를 제공하는데
        사용됩니다.
        <br />
        <br />
        4. 사용자는 자신이 제공하는 정보를 기반으로 한{" "}
        <span style={{ color: "red" }}>
          응답이 의학적 판단이나 진단을 위한 것이 아님을 인지 후 사용
        </span>
        해야 합니다.
        <br />
        <br />
      </p>
      <div style={{ textAlign: "center" }}>
        <button className={styles["button-agree"]} onClick={onAgree}>
          동의
        </button>
        &nbsp;&nbsp;
        <button className={styles["button-agree-secondary"]} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

const questionsNormal = ["안녕하세요. 무엇을 도와드릴까요?"];

type Message = {
  text: string;
  sender: string;
};

const Chatbot: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [painArea, setPainArea] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMode, setChatMode] = useState("normal");
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDiseasePredictionPopup, setShowDiseasePredictionPopup] =
    useState(false);

  // useEffect(() => {}, [showDiseasePredictionPopup]);

  // 버튼 클릭 핸들러
  const handleModeChange = (mode: string) => {
    setChatMode(mode);
    setCurrentStep(0);
    if (mode === "normal") {
      // "AI 일반 대화" 모드로 변경 시 초기 메시지 설정
      setMessages([{ text: questionsNormal[0], sender: "bot" }]);
    } else if (mode === "diseasePrediction") {
      // "AI 질병 예측" 모드로 변경 시 초기 메시지 설정
      setMessages([{ text: questionsDisease[0], sender: "bot" }]);
    }
  };

  const [popupVisible, setPopupVisible] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const normalFocus = useRef<HTMLInputElement>(null);
  const AIFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (normalFocus.current !== null) {
      normalFocus.current.focus();
    }
  }, [isProcessing]);

  useEffect(() => {
    if (AIFocus.current !== null) {
      AIFocus.current.focus();
    }
  }, [isLoading]);

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  const togglePopdown = () => {
    setPopupVisible((prev) => !prev);
  };

  const handleOpenChatbot = () => {
    // 챗봇 모드를 기본값으로 설정
    setChatMode("normal");

    // 질문 단계를 초기화
    setCurrentStep(0);

    // 메시지 배열을 초기화 (일반 대화 시작 메시지로 설정)
    setMessages([{ text: questionsNormal[0], sender: "bot" }]);

    // 사용자 입력 관련 상태들을 초기화
    setSex("");
    setAge("");
    setPainArea("");
    setSymptoms("");
    setUserInput("");

    // 모달을 표시
    togglePopup();
  };

  const handleOpenChatbotDown = () => {
    togglePopdown();
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 메시지를 추가
    setMessages([{ text: questionsDisease[0], sender: "bot" }]);
    setIsEnd(true);
  }, []);

  useEffect(() => {
    // currentStep이 변경될 때 새로운 메시지를 추가
    if (currentStep > 0 && currentStep < questionsDisease.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: questionsDisease[currentStep], sender: "bot" },
      ]);
      // } else if (
      //   currentStep === questionsDisease.length &&
      //   chatMode === "diseasePrediction"
      // ) {
      //   // "다시 하시겠습니까?" 메시지 추가
      //   setMessages((prevMessages) => [
      //     ...prevMessages,
      //     { text: "다시 하시겠습니까?", sender: "bot" },
      //   ]);
    }
  }, [currentStep, chatMode]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // function wait(seconds, callback) {
  //   setTimeout(callback, seconds * 1000); // setTimeout은 밀리초 단위이므로 초로 변환
  // }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("클릭");
    if (userInput.length === 0) return;
    if (e.key === "Enter") {
      setMessages((messages) => [
        ...messages,
        { text: userInput, sender: "user" },
      ]);
      setUserInput("");

      switch (currentStep) {
        case 0:
          setSex(userInput);
          break;
        case 1:
          setAge(userInput);
          break;
        case 2:
          setPainArea(userInput);
          break;
        case 3:
          setSymptoms(userInput);
          break;
        default:
          break;
      }
      if (currentStep + 1 >= questionsDisease.length) {
        submitChatBot(userInput);
        setIsLoading(true);
        // wait(2, function () {
        //   console.log("5초");
        //   setIsEnd(false);
        //   setIsLoading(false);
        // });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleKeyPressNormal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("클릭");
    if (userInput.length === 0) return;
    if (e.key === "Enter") {
      setMessages((messages) => [
        ...messages,
        { text: userInput, sender: "user" },
      ]);
      console.log(userInput + "userInput");
      setContent(userInput); // 여기서 상태를 설정하지만,
      setUserInput("");
      submitChatBotNormal(userInput); // 여기서 현재의 userInput 값을 직접 전달
    }
  };

  const handleRestart = () => {
    setIsEnd(true);
    setCurrentStep(0);
    setMessages([{ text: questionsDisease[0], sender: "bot" }]);
  };

  const submitChatBot = async (currentInput: string) => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await handlerChatBot(sex, age, painArea, currentInput);

      const responseText = `예상 원인: ${response.cause} 
      
받아볼만한 검사: ${response.recommended_tests}`;
      // 예상 질병: ${response.disease}

      setMessages((messages) => [
        ...messages,
        { text: responseText, sender: "bot" },
      ]);

      setIsLoading(false); // 로딩 종료
      setIsEnd(false);
    } catch (error) {
      console.error("챗봇 요청 처리 중 오류 발생", error);
      setIsLoading(false); // 로딩 종료
      setIsEnd(false);
    }
  };
  // 일반 대화 호출도 -> content : userInput
  const submitChatBotNormal = async (currentInput: string) => {
    try {
      setIsProcessing(true);
      const response = await handlerChatBotNormal(currentInput);
      setMessages((messages) => [
        ...messages,
        { text: response, sender: "bot" }, // 'response.response' 사용
      ]);
      setIsProcessing(false);
    } catch (error) {
      console.error("챗봇 요청 처리 중 오류 발생", error);
      setIsProcessing(false);
    }
  };

  // 팝업
  const handleImageClick = () => {
    if (popupVisible) setShowDiseasePredictionPopup(true);
    else handleOpenChatbot();
  };

  const handleAgree = () => {
    if (popupVisible) {
      setShowDiseasePredictionPopup(false);
    }
    handleOpenChatbot();
  };

  const handleClosePopup = () => {
    if (popupVisible) setShowDiseasePredictionPopup(false); // 팝업을 닫기
  };

  return (
    <div>
      {showDiseasePredictionPopup && (
        <DiseasePredictionPopup
          onClose={handleClosePopup}
          onAgree={handleAgree}
        />
      )}
      <div
        className={styles["chatbot-popup-container"]}
        onClick={handleImageClick}
      >
        <img
          src="/infoPic/chatbot.png"
          alt="Chat Icon"
          style={{ width: "85%", height: "auto" }}
        />
      </div>
      {popupVisible ? null : (
        <div className={styles["chatbot-container"]}>
          <div className={styles["chatbot-buttons"]}>
            <button
              className={styles["chatbot-button-normal"]}
              onClick={() => handleModeChange("normal")}
            >
              AI 대화
            </button>
            <button
              className={styles["chatbot-button"]}
              onClick={() => handleModeChange("diseasePrediction")}
            >
              질병 예측
            </button>
          </div>
          {chatMode === "diseasePrediction" ? (
            <div className={styles["whole-container"]}>
              <div className={styles["flex-container"]}>
                <h3 className={styles["chatbot-head"]}>AI 질병 예측</h3>
              </div>
              <div className={styles["chat-container"]}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={styles["message-container"]}
                    style={{
                      flexDirection:
                        msg.sender === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <div
                      className={`${styles.message} ${
                        msg.sender === "user" ? styles.user : styles.bot
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div>
                    <p>1분~3분 가량 소요됩니다...</p>
                    <div className={styles["loading"]}>Loading</div>
                  </div>
                )}
                {!isEnd &&
                  !isLoading &&
                  currentStep >= questionsDisease.length && (
                    <div>
                      <div style={{ textAlign: "center" }}>
                        다시 하시겠습니까?
                      </div>
                      <div className={styles["flex-container-bottom"]}>
                        <button onClick={handleRestart}>네</button>
                        <button onClick={handleOpenChatbotDown}>아니오</button>
                      </div>
                    </div>
                  )}
              </div>
              {/* 입력 필드는 질문이 모두 완료되기 전까지 표시 */}
              {currentStep < questionsDisease.length && (
                <div className={styles["flex-container-bottom"]}>
                  <input
                    ref={AIFocus}
                    className={styles["chatbot-input"]}
                    type="text"
                    placeholder="답변을 입력하세요"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles["whole-container"]}>
              <div className={styles["flex-container-normal"]}>
                <h3 className={styles["chatbot-head"]}>AI 일반 대화</h3>
              </div>
              <div className={styles["chat-container"]}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={styles["message-container"]}
                    style={{
                      flexDirection:
                        msg.sender === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <div
                      className={`${styles.message} ${
                        msg.sender === "user" ? styles.user : styles.bot
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles["flex-container-bottom"]}>
                <input
                  ref={normalFocus}
                  className={styles["chatbot-input"]}
                  type="text"
                  placeholder="답변을 입력하세요"
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyPress={handleKeyPressNormal}
                  disabled={isProcessing}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
