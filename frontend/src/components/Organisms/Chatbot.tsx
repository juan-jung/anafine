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

  return (
    <div>
      {popupVisible ? (
        <div
          className={styles["chatbot-popup-container"]}
          onClick={handleOpenChatbot}
        >
          chat
        </div>
      ) : (
        <div className={styles["chatbot-container"]}>
          <div
            className={styles["chatbot-head"]}
            onClick={handleOpenChatbotDown}
          >
            AI 질병 예측
          </div>
          <div className={styles["chatbot-header"]}>
            <div className={styles["chatbot-messages"]}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className={styles["chatbot-bottom"]}>
            {currentStep < questions.length && (
              <input
                className={styles["chatbot-input"]}
                type="text"
                placeholder="답변을 입력하세요"
                value={userInput}
                onChange={handleUserInput}
                onKeyPress={handleKeyPress}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
