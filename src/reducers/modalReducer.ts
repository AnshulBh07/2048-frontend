import { IModalState } from "@/services/interfaces";

const initialState: IModalState = {
  gameContinueModal: false,
  gameWinModal: false,
  gameOverModal: false,
  guideModal: false,
  leaderBoardModal: false,
};

type actionType = { type: string; payload?: boolean };

export const modalReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "modal/game_continue":
      return { ...state, gameContinueModal: action.payload as boolean };
    case "modal/game_win":
      return { ...state, gameWinModal: action.payload as boolean };
    case "modal/game_over":
      return { ...state, gameOverModal: action.payload as boolean };
    case "modal/leaderboard":
      return { ...state, leaderBoardModal: action.payload as boolean };
    case "modal/guide":
      return { ...state, guideModal: action.payload as boolean };
    default:
      return state;
  }
};
