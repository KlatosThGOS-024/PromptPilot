import { useEffect, useState } from "react";
import { UserMessage } from "./UserMessage";
import { useSelector } from "react-redux";
import { IRootState } from "../app/store/store";
import { AiResponse } from "./AiMessage";

export const MessageBox = () => {
  const [responses, setResponses] = useState([
    { response_frm: "User", response: "helloFrmUser1", id: "2" },
    { response_frm: "Ai", response: "helloFrmAI1", id: "3" },
  ]);

  const userReducerValue = useSelector(
    (state: IRootState) => state.userReducer
  );
  useEffect(() => {
    const response = {
      response_frm: "User",
      response: userReducerValue.userMessage,
      id: userReducerValue.id,
    };
    if (userReducerValue) {
      setResponses((prevData) => {
        const isDuplicate = prevData.some((item) => item.id === response.id);
        if (!isDuplicate) {
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
        id: aiReducerValue.id,
      };
      setResponses((prevData) => {
        const isDuplicate = prevData.some((item) => item.id === response.id);
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
