import { useEffect, useState } from "react";
import { getAllChats } from "../api/AiApi";
import { Link } from "react-router-dom";
import { Chat } from "./Chat";

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
            <Link key={index} to={`/c/${id}`}>
              <Chat sessionId={id} />
            </Link>
          )
        );
      })}
    </div>
  );
};
