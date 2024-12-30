import mongoose from "mongoose";

export interface IChat extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  _id?: string;
  chats: Array<{
    session_id: string;
    response_frm: string;
    response: string;
    id: string;
  }>;
}
