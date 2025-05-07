import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./reducers/gameReducer";
import { loginReducer } from "./reducers/loginReducer";
import { signupReducer } from "./reducers/signupReducer";
import { modalReducer } from "./reducers/modalReducer";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    login: loginReducer,
    signup: signupReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
