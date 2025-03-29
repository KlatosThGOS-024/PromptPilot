import { useEffect, useState } from "react";
import { UserMessage } from "./UserMessage";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../app/store/store";
import { AiResponse } from "./AiMessage";
import {
  getParticularChat,
  saveNewChat,
  saveOldSessionChat,
} from "../api/AiApi";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DiscoverCards } from "./DiscoverCards";
import { makeItFalse } from "../functions/messages/message";
export interface responseType {
  response_frm: string;
  response: string;
  chatId: string;
}
export const MessageBox = () => {
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const cardSelector = useSelector(
    (state: IRootState) => state.cardReducer.status
  );
  const navigate = useNavigate();

  const [responses, setResponses] = useState<responseType[]>([]);
  useEffect(() => {
    if (sessionId) {
      dispatch(makeItFalse());
    }
  }, [sessionId]);
  useEffect(() => {
    const getChatFunc = async (sessionId: string) => {
      const response = await getParticularChat(sessionId);
      return await response;
    };
    if (sessionId) {
      getChatFunc(sessionId).then((response) => {
        setResponses((prevData) => {
          const message = response.sessions[0].messages;
          const combinedData = [...prevData, ...message];

          const uniqueResponses = combinedData.filter(
            (item, index, self) =>
              self.findIndex((entry) => entry.chatId === item.chatId) === index
          );

          return uniqueResponses;
        });
      });
    }
  }, []);

  const userReducerValue = useSelector(
    (state: IRootState) => state.userReducer
  );

  useEffect(() => {
    const response = {
      response_frm: "User",
      response: userReducerValue.userMessage,
      chatId: userReducerValue.id,
    };
    if (userReducerValue?.userMessage && userReducerValue?.id) {
      if (sessionId == undefined) {
        const newSessionId = uuidv4();
        navigate(`/c/${newSessionId}`, { replace: true });

        saveNewChat(response, newSessionId);
      } else {
        saveOldSessionChat(response, sessionId);
      }
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
  }, [userReducerValue]);

  const aiReducerValue = useSelector((state: IRootState) => state.AiReducer);
  useEffect(() => {
    if (aiReducerValue?.AiMessage && aiReducerValue?.id) {
      const response = {
        response_frm: "Ai",
        response: aiReducerValue.AiMessage,
        chatId: aiReducerValue.id,
      };
      if (sessionId == undefined) {
        const newSessionId = uuidv4();
        saveNewChat(response, newSessionId);
      } else {
        saveOldSessionChat(response, sessionId);
      }

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
    <section className="lg:w-[900px] my-7 pb-[96px] pt-4">
      {cardSelector && (
        <div className="  my-[196px] ">
          <DiscoverCards />
        </div>
      )}
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
