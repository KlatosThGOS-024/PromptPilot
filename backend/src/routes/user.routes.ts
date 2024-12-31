import { Router } from "express";
import {
  userCreate,
  userLogin,
  userLogout,
  userProfile,
} from "../controllers/user.controller";
import { userAuth } from "../middleware/user.middleware";

const userRouter = Router();
userRouter.route("/signUp").post(userCreate);
userRouter.route("/login").post(userLogin);
userRouter.route("/user-profile").get(userAuth, userProfile);
userRouter.route("/logout").post(userAuth, userLogout);
export default userRouter;
