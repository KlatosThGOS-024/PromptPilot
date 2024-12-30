import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

import Chat from "../models/ai.models";

const getAnswer = asyncHandler(async (req: Request, res: Response) => {
  const getQuestion = req.body.getQuestion as string;
  console.log(getQuestion);
  if (getQuestion == "") {
    res.status(400).send(new ApiError(400, "Provide Question", getQuestion));
    return;
  }
  try {
    const api = process.env.AiAPI;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api}`;
    const response = await fetch(url, {
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
    const data = await response.json();

    const getAnswer = data.candidates[0].content.parts[0].text;
    res
      .status(200)
      .send(new ApiResponse(200, getAnswer, "Successfully get the answer"));
  } catch (error: any) {
    res
      .status(400)
      .send(new ApiError(400, "Something went wrong", error.error));
    return;
  }
});
const getChats = asyncHandler(async (req: Request, res: Response) => {
  const chatId = req.query.id;
  if (chatId == "") {
    res.status(400).send(new ApiError(400, "Chat id went wrong"));
    return;
  }
  console.log(chatId);
  try {
    const chat = await Chat.findOne({
      userId: req.user._id,
      "sessions.sessionId": chatId,
    });
    console.log(chat);
    if (!chat) {
      res.status(404).send(new ApiError(400, "Chat not found"));
      return;
    }

    res
      .status(200)
      .send(new ApiResponse(200, chat, "Successfully get the Chats"));
  } catch (error: any) {
    res
      .status(400)
      .send(new ApiError(400, "Something went wrong", error.error));
    return;
  }
});
const saveChat = asyncHandler(async (req: Request, res: Response) => {
  const { chat } = req.body;
  const sessionId = req.query.id;
  const userId = req.user._id;
  if (chat == "") {
    res.status(400).send(new ApiError(400, "Chat! Something  went wrong"));
    return;
  }
  const { response_frm, response, nanoId } = chat.messages;

  try {
    const updateChatSection = await Chat.findOneAndUpdate(
      {
        "sessions.sessionId": sessionId,
        userId,
      },
      {
        $push: {
          "sessions.$.messages": {
            response_frm,
            response,
            nanoId,
          },
        },
      },
      { new: true }
    );

    if (!updateChatSection) {
      console.log("user id2");

      const createNewChatSession = await Chat.create({
        userId,
        sessions: [
          {
            sessionId,
            messages: [
              {
                response_frm,
                response,
                nanoId,
              },
            ],
          },
        ],
      });
      res
        .status(200)
        .send(
          new ApiResponse(
            200,
            createNewChatSession,
            "Successfully saved the Chat"
          )
        );
      return;
    }
    res.status(200).send(new ApiResponse(200, "Successfully saved the Chat"));
    return;
  } catch (error: any) {
    res
      .status(400)
      .send(new ApiError(400, "Something went wrong", error.error));
    return;
  }
});

export { getAnswer, getChats, saveChat };
