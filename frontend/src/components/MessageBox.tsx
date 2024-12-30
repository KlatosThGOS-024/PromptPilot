import { useEffect, useState } from "react";
import { UserMessage } from "./UserMessage";
import { useSelector } from "react-redux";
import { IRootState } from "../app/store/store";
import { AiResponse } from "./AiMessage";
import { getChats, saveChat } from "../api/AiApi";
import { useParams } from "react-router-dom";

export const MessageBox = () => {
  const { sessionId } = useParams();
  const [responses, setResponses] = useState([
    { response_frm: "User", response: "helloFrmUser1", chatId: "2" },
    { response_frm: "Ai", response: "helloFrmAI1", chatId: "3" },
  ]);

  // useEffect(() => {
  //   const fun = async () => {
  //     const data = await getChats("Apple232@");
  //     console.log(data);
  //   };
  //   fun();
  // }, []);
  const userReducerValue = useSelector(
    (state: IRootState) => state.userReducer
  );
  useEffect(() => {
    const response = {
      response_frm: "User",
      response: userReducerValue.userMessage,
      chatId: userReducerValue.id,
    };
    if (userReducerValue) {
      setResponses((prevData) => {
        const isDuplicate = prevData.some(
          (item) => item.chatId === response.chatId
        );
        if (!isDuplicate) {
          saveChat(response, sessionId);
          return [...prevData, response];
        }
        return prevData;
      });
    }
  }, [userReducerValue]);

  const aiReducerValue = useSelector((state: IRootState) => state.AiReducer);
  useEffect(() => {
    if (aiReducerValue) {
      const response = {
        response_frm: "Ai",
        response: aiReducerValue.AiMessage,
        chatId: aiReducerValue.id,
      };

      setResponses((prevData) => {
        const isDuplicate = prevData.some(
          (item) => item.chatId === response.chatId
        );
        if (!isDuplicate) {
          return [...prevData, response];
        }
        return prevData;
      });
    }
  }, [aiReducerValue]);

  return (
    <section className="w-full my-7 py-[18px]">
      <div className="space-y-[21px]">
        {responses.map((value, index) => {
          if (value.response_frm == "User") {
            return (
              value.response != "" && (
                <div key={index} className="user-message  ">
                  {value.response != ""}
                  <UserMessage message={value.response} />
                </div>
              )
            );
          } else if (value.response_frm == "Ai") {
            return (
              value.response != "" && (
                <div key={index} className="Ai-Response ">
                  <AiResponse message={value.response} />
                </div>
              )
            );
          }
        })}
      </div>
    </section>
  );
};
