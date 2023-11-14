import React, { useState, useEffect } from "react";
import handlerChatBot from "utils/handlerChatBot";
import styles from "../../styles/chatbot.module.css";

const questions = [
  "성별을 알려주세요.",
  "나이를 알려주세요.",
  "통증 부위를 알려주세요.",
  "증상에 대해 알려주세요.",
];

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

  // 버튼 클릭 핸들러
  const handleModeChange = (mode: string) => {
    setChatMode(mode);
  };

  const [popupVisible, setPopupVisible] = useState(true);

  const togglePopup = () => {
    setPopupVisible(false);
  };

  const togglePopdown = () => {
    setPopupVisible(true);
  };

  const handleOpenChatbot = () => {
    togglePopup();
  };

  const handleOpenChatbotDown = () => {
    togglePopdown();
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 메시지를 추가
    setMessages([{ text: questions[0], sender: "bot" }]);
  }, []);

  useEffect(() => {
    // currentStep이 변경될 때 새로운 메시지를 추가
    if (currentStep > 0 && currentStep < questions.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: questions[currentStep], sender: "bot" },
      ]);
    } else if (currentStep >= questions.length) {
      submitChatBot();
    }
  }, [currentStep]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("클릭");
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

      setCurrentStep(currentStep + 1);
    }
  };

  const submitChatBot = async () => {
    // try {
    //   const response = await handlerChatBot(sex, age, painArea, symptoms);
    //   setMessages((messages) => [
    //     ...messages,
    //     { text: response, sender: "bot" },
    //   ]);
    // } catch (error) {
    //   console.error("챗봇 요청 처리 중 오류 발생", error);
    // }
  };
  // 일반 대화 호출도

  return (
    <div>
      {popupVisible ? (
        <div
          className={styles["chatbot-popup-container"]}
          onClick={handleOpenChatbot}
        >
          <img
            src="/infoPic/chatbot.png"
            alt="Chat Icon"
            style={{ width: "85%", height: "auto" }}
          />
        </div>
      ) : (
        <div className={styles["chatbot-container"]}>
          <div className={styles["chatbot-buttons"]}>
            <button
              className={styles["chatbot-button-normal"]}
              onClick={() => handleModeChange("normal")}
            >
              대화
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
              <div
                onClick={handleOpenChatbotDown}
                className={styles["flex-container"]}
              >
                <div style={{ marginLeft: "200x" }}></div>
                <h3
                  className={styles["chatbot-head"]}
                  style={{ marginLeft: "160px" }}
                >
                  AI 질병 예측
                </h3>
                <img
                  src="/infoPic/close.png"
                  alt="Chat Icon"
                  style={{ width: "5%", height: "auto", marginLeft: "160px" }}
                />
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
              {currentStep < questions.length && (
                <div className={styles["flex-container-bottom"]}>
                  <input
                    className={styles["chatbot-input"]}
                    type="text"
                    placeholder="답변을 입력하세요"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyPress={handleKeyPress}
                  />
                  <img
                    src="/infoPic/next.png"
                    alt="next Icon"
                    style={{
                      width: "8%",
                      height: "auto",
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles["whole-container"]}>
              <div
                onClick={handleOpenChatbotDown}
                className={styles["flex-container"]}
              >
                <div style={{ marginLeft: "200x" }}></div>
                <h3
                  className={styles["chatbot-head"]}
                  style={{ marginLeft: "160px" }}
                >
                  AI 일반 대화
                </h3>
                <img
                  src="/infoPic/close.png"
                  alt="Chat Icon"
                  style={{ width: "5%", height: "auto", marginLeft: "160px" }}
                />
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
              <input
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
      )}
    </div>
  );
};

export default Chatbot;
