"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveChatAtCurrentSession = exports.saveNewChatSession = exports.getParticularChat = exports.getAllChats = exports.getAnswer = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ai_models_1 = __importDefault(require("../models/ai.models"));
const getAnswer = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getQuestion = req.body.getQuestion;
    console.log(getQuestion);
    if (getQuestion == "") {
        res.status(400).send(new ApiError_1.default(400, "Provide Question", getQuestion));
        return;
    }
    try {
        const api = process.env.AiAPI;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api}`;
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: getQuestion,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = yield response.json();
        const getAnswer = data.candidates[0].content.parts[0].text;
        res
            .status(200)
            .send(new ApiResponse_1.default(200, getAnswer, "Successfully get the answer"));
    }
    catch (error) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Something went wrong", error.error));
        return;
    }
}));
exports.getAnswer = getAnswer;
const getAllChats = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield ai_models_1.default.find({
            userId: req.user._id,
        });
        if (!chat) {
            res.status(400).send(new ApiError_1.default(400, "Chats not found", chat));
            return;
        }
        res
            .status(200)
            .send(new ApiResponse_1.default(200, chat, "Successfully get the Chats"));
    }
    catch (error) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Something went wrong", error.error));
        return;
    }
}));
exports.getAllChats = getAllChats;
const getParticularChat = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = req.query.id;
    if (chatId == "") {
        res.status(404).send(new ApiError_1.default(400, "Chat with this id is not avaible"));
        return;
    }
    try {
        const chat = yield ai_models_1.default.findOne({
            userId: req.user._id,
            "sessions.sessionId": chatId,
        });
        if (!chat) {
            res.status(404).send(new ApiError_1.default(400, "Chat not found"));
            return;
        }
        res
            .status(200)
            .send(new ApiResponse_1.default(200, chat, "Successfully get the Chats"));
    }
    catch (error) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Something went wrong", error.error));
        return;
    }
}));
exports.getParticularChat = getParticularChat;
const saveChatAtCurrentSession = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat } = req.body;
    const sessionId = req.query.id;
    const userId = req.user._id;
    if (chat == "") {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Chat body please provide! Something  went wrong"));
        return;
    }
    const { response_frm, response, chatId } = chat.messages;
    try {
        const updateChatSection = yield ai_models_1.default.findOneAndUpdate({
            "sessions.sessionId": sessionId,
            userId,
        }, {
            $push: {
                "sessions.$.messages": {
                    response_frm,
                    response,
                    chatId,
                },
            },
        }, { new: true });
        res
            .status(200)
            .send(new ApiResponse_1.default(200, updateChatSection, "Successfully saved the Chat"));
        return;
    }
    catch (error) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Something went wrong", error.error));
        return;
    }
}));
exports.saveChatAtCurrentSession = saveChatAtCurrentSession;
const saveNewChatSession = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat } = req.body;
    const sessionId = req.query.id;
    const userId = req.user._id;
    if (chat == "") {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Chat body please provide! Something  went wrong"));
        return;
    }
    const { response_frm, response, chatId } = chat.messages;
    try {
        const createNewChatSession = yield ai_models_1.default.create({
            userId,
            sessions: [
                {
                    sessionId,
                    messages: [
                        {
                            response_frm,
                            response,
                            chatId,
                        },
                    ],
                },
            ],
        });
        res
            .status(200)
            .send(new ApiResponse_1.default(200, createNewChatSession, "Successfully saved the Chat"));
        return;
    }
    catch (error) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Something went wrong", error.error));
        return;
    }
}));
exports.saveNewChatSession = saveNewChatSession;
