import { Router } from "express";
import {
  getAnswer,
  getChats,
  saveChat,
} from "../controllers/AiResponse.controller";
import { userAuth } from "../middleware/user.middleware";
const aiRouter = Router();
aiRouter.route("/get-answer").post(getAnswer);
aiRouter.route("/get-chats").get(userAuth, getChats);
aiRouter.route("/save-chat").post(userAuth, saveChat);
export default aiRouter;
