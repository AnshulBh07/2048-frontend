import { gameReducer } from "@/reducers/gameReducer";
import { loginReducer } from "@/reducers/loginReducer";
import { modalReducer } from "@/reducers/modalReducer";
import { signupReducer } from "@/reducers/signupReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  game: gameReducer,
  login: loginReducer,
  signup: signupReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
