import { ILoginState } from "../services/interfaces";

const initialState: ILoginState = {
  isLoggedIn: false,
  username: "",
  email: "",
  password: "",
  remember: false,
  showModal: false,
  isMusicEnabled: false,
};

type actionType = { type: string; payload?: string | boolean };

export const loginReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "login/username":
      return { ...state, username: action.payload as string };
    case "login/email":
      return { ...state, email: action.payload as string };
    case "login/password":
      return { ...state, password: action.payload as string };
    case "login/remember":
      return { ...state, remember: action.payload as boolean };
    case "login/logged":
      return { ...state, isLoggedIn: action.payload as boolean };
    case "login/modal":
      return { ...state, showModal: action.payload as boolean };
    case "login/set_music":
      return { ...state, isMusicEnabled: action.payload as boolean };
    default:
      return state;
  }
};
