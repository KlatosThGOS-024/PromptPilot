import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
interface userState {
  id: string;
  userMessage: string;
  userDetail: {
    fullName: string;
    username: string;
    email: string;
  };
}
interface AiState {
  id: string;
  AiMessage: string;
}
const initialStateOfUser: userState = {
  id: "",
  userMessage: "",
  userDetail: {
    fullName: "",
    username: "",
    email: "",
  },
};
const initialStateOfAi: AiState = {
  id: "",
  AiMessage: "",
};

const initialStateOfCard = {
  status: true,
};
export const userMessageSlice = createSlice({
  name: "user",
  initialState: initialStateOfUser,
  reducers: {
    addMessageRight: (state, action: PayloadAction<string>) => {
      state.id = nanoid();
      state.userMessage = action.payload;
    },
    userAccountDetail: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        username: string;
        email: string;
      }>
    ) => {
      state.userDetail.fullName =
        action.payload.firstName + action.payload.lastName;
      state.userDetail.email = action.payload.email;
      state.userDetail.username = action.payload.username;
    },
  },
});

export const AiMessageSlice = createSlice({
  name: "AI",
  initialState: initialStateOfAi,
  reducers: {
    addMessageLeft: (state, action: PayloadAction<string>) => {
      state.id = nanoid();
      state.AiMessage = action.payload;
    },
  },
});
export const cardSlice = createSlice({
  name: "Card",
  initialState: initialStateOfCard,
  reducers: {
    makeItFalse: (state) => {
      state.status = false;
    },
  },
});
export const { userAccountDetail } = userMessageSlice.actions;
export const { makeItFalse } = cardSlice.actions;
export const { addMessageRight } = userMessageSlice.actions;
export const { addMessageLeft } = AiMessageSlice.actions;
export const userSlicer = userMessageSlice.reducer;
export const AiSlicer = AiMessageSlice.reducer;
export const cardSlicer = cardSlice.reducer;
