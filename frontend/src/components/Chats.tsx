import { useEffect, useState } from "react";
import { getAllChats } from "../api/AiApi";

import { getParticularChat } from "../api/AiApi";

type ChatProps = {
  sessionId: string;
};

export const Chat = ({ sessionId }: ChatProps) => {
  const getParticularChatFunc = async (sessionId: string) => {
    try {
      await getParticularChat(sessionId);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getParticularChatFunc(sessionId);
  }, []);

  return (
    <div className=" my-3 bg-gray-500 rounded-lg px-3 py-4">
      <div>{sessionId}</div>
    </div>
  );
};

export const Chats = () => {
  const [chatSession, setChatSession] = useState<any[]>([""]);
  const getChatAll = async () => {
    try {
      const response = await getAllChats();
      setChatSession(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getChatAll();
  }, []);

  return (
    <div>
      {chatSession.map((value, index) => {
        const id = value.sessions?.[0]?.sessionId;

        return (
          id != undefined && (
            <a key={index} href={`/c/${id}`}>
              <Chat sessionId={id} />
            </a>
          )
        );
      })}
    </div>
  );
};
