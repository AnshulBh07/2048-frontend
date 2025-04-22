import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./reducers/gameReducer";
import { loginReducer } from "./reducers/loginReducer";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
