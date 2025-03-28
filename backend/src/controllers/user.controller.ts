import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import User from "../models/user.models";
import { userCreateSchema, userLoginSchema } from "../types/user.types";

const generateAccessToken = async (user: any) => {
  try {
    return await user.generateAccessTokenMethod();
  } catch (error) {
    throw new ApiError(500, "Failed to generate access token", error);
  }
};

const userCreate = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = userCreateSchema.safeParse(req.body);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    throw new ApiError(
      400,
      "Invalid user registration details",
      formattedErrors
    );
  }

  const { username, email } = validationResult.data;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    const errorMessage =
      existingUser.username === username
        ? "Username is already taken"
        : "Email is already registered";

    throw new ApiError(409, errorMessage, {
      conflictField: existingUser.username === username ? "username" : "email",
    });
  }

  const newUser = await User.create(validationResult.data);

  const userResponse = newUser.toObject();

  res
    .status(201)
    .json(
      new ApiResponse(201, userResponse, "User account created successfully")
    );
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = userLoginSchema.safeParse(req.body);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    throw new ApiError(400, "Invalid login credentials", formattedErrors);
  }

  const { username, password } = validationResult.data;

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User not found", {
      username: "No account exists with this username",
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid login credentials", {
      password: "Incorrect password",
    });
  }

  const accessToken = await generateAccessToken(user);

  const userResponse = user.toObject();

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json(
      new ApiResponse(
        200,
        {
          user: userResponse,
          accessToken,
        },
        "Login successful"
      )
    );
});

const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Authentication required", {
      authentication: "No user found in request",
    });
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User profile not found", {
      user: "User does not exist",
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

const userLogout = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, null, "Logout successful"));
});

export { userCreate, userLogin, userLogout, userProfile };
