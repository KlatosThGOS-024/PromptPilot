import { configureStore } from "@reduxjs/toolkit";
import {
  AiSlicer,
  cardSlicer,
  userSlicer,
} from "../../functions/messages/message";

export const store = configureStore({
  reducer: {
    userReducer: userSlicer,
    AiReducer: AiSlicer,
    cardReducer: cardSlicer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;
