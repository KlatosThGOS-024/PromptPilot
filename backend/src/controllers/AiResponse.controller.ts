import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { IUser, userCreateSchema, userLoginSchema } from "../types/user.types";
import ApiError from "../utils/ApiError";
import User from "../models/user.models";
import { get } from "mongoose";

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

export { getAnswer };
