import { useEffect } from "react";
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
