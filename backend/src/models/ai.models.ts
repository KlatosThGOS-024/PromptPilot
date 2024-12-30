import mongoose, { model, Schema } from "mongoose";
import { IChat } from "../types/ai.types";

const ChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessions: [
    {
      sessionId: {
        type: String,
        required: true,
      },
      messages: [
        {
          response_frm: {
            type: String,
            required: true,
          },
          response: {
            type: String,
            required: true,
          },
          chatId: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Chat = model<IChat>("Chat", ChatSchema);
export default Chat;
