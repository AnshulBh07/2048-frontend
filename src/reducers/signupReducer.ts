import { ISignupState } from "@/services/interfaces";

const initialState: ISignupState = {
  username: "",
  password: "",
  confirm_password: "",
  email: "",
  isVerified: false,
};

type actionType = { type: string; payload?: string | boolean };

export const signupReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "signup/username":
      return { ...state, username: action.payload as string };
    case "signup/email":
      return { ...state, email: action.payload as string };
    case "signup/password":
      return { ...state, password: action.payload as string };
    case "signup/confirm_password":
      return { ...state, confirm_password: action.payload as string };
    case "signup/verify":
      return { ...state, isVerified: action.payload as boolean };
    default:
      return state;
  }
};
