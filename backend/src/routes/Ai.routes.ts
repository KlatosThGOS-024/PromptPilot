import { Router } from "express";
import { getAnswer } from "../controllers/AiResponse.controller";
const aiRouter = Router();
aiRouter.route("/get-answer").post(getAnswer);
export default aiRouter;
