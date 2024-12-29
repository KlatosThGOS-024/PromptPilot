"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AiResponse_controller_1 = require("../controllers/AiResponse.controller");
const aiRouter = (0, express_1.Router)();
aiRouter.route("/get-answer").post(AiResponse_controller_1.getAnswer);
exports.default = aiRouter;
