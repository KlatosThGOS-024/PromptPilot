import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
interface userState {
  id: string;
  userMessage: string;
}
interface AiState {
  id: string;
  AiMessage: string;
}
const initialStateOfUser: userState = {
  id: "",
  userMessage: "",
};
const initialStateOfAi: AiState = {
  id: "",
  AiMessage: "",
};

export const userMessageSlice = createSlice({
  name: "user",
  initialState: initialStateOfUser,
  reducers: {
    addMessageRight: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.id = nanoid();
      state.userMessage = action.payload;
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
export const { addMessageRight } = userMessageSlice.actions;
export const { addMessageLeft } = AiMessageSlice.actions;
export const userSlicer = userMessageSlice.reducer;
export const AiSlicer = AiMessageSlice.reducer;
