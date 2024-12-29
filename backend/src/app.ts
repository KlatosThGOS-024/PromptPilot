import express from "express";
import userRouter from "./routes/user.routes";
import aiRouter from "./routes/Ai.routes";

const router = express();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/ai", aiRouter);

export default router;
