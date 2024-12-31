import { Router } from "express";
import {
  getAnswer,
  getAllChats,
  getParticularChat,
  saveChatAtCurrentSession,
  saveNewChatSession,
} from "../controllers/AiResponse.controller";
import { userAuth } from "../middleware/user.middleware";
const aiRouter = Router();
aiRouter.route("/get-answer").post(getAnswer);
aiRouter.route("/get-all-chat").get(userAuth, getAllChats);
aiRouter.route("/get-particular-chat").get(userAuth, getParticularChat);
aiRouter.route("/save-chat-new").post(userAuth, saveNewChatSession);
aiRouter.route("/save-chat-old").post(userAuth, saveChatAtCurrentSession);

export default aiRouter;
