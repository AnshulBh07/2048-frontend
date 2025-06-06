import { calculateGameState } from "../services/helperFunctions";
import { coordinates, IGameState, position } from "../services/interfaces";

// this whole state will also be saved in backend for checkpoint
const initialState: IGameState = {
  prevMatrix: new Array(4).fill(null).map(() => new Array(4).fill(0)),
  matrix: new Array(4).fill(null).map(() => new Array(4).fill(0)),
  positionsArr: [],
  maxScore: 0,
  currScore: 0,
  moves: 0,
  status: "not started",
  best: 0,
  rows: 4,
  columns: 4,
  undo: false,
  slide: false,
  scoreAnimate: false,
  screen: "desktop",
  tileWidth: 6.5,
  newTileCoords: [],
  gap: 0.5,
  font_size: 2.5,
};

type matrixType = number[][];

type coordsMatrix = coordinates[];

type actionType = {
  type: string;
  payload?: number | matrixType | string | boolean | coordsMatrix | position[];
};

export const gameReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "game/set_matrix":
      return { ...state, matrix: action.payload as matrixType };
    case "game/set_undo":
      return { ...state, undo: action.payload as boolean };
    case "game/set_prev":
      return { ...state, prevMatrix: action.payload as matrixType };
    case "game/set_score_animate":
      return { ...state, scoreAnimate: action.payload as boolean };
    case "game/set_currScore":
      return { ...state, currScore: action.payload as number };
    case "game/set_maxScore":
      return { ...state, maxScore: action.payload as number };
    case "game/set_new_tile_coords":
      return { ...state, newTileCoords: action.payload as coordsMatrix };
    case "game/set_positions":
      return { ...state, positionsArr: action.payload as position[] };
    case "game/set_status":
      return { ...state, status: action.payload as string };
    case "game/set_slide":
      return { ...state, slide: action.payload as boolean };
    case "game/set_tileWidth":
      return { ...state, tileWidth: action.payload as number };
    case "game/set_gap":
      return { ...state, gap: action.payload as number };
    case "game/set_screen":
      return { ...state, screen: action.payload as string };
    case "game/set_game":
      return calculateGameState(state, action.payload as string);
    case "game/moves":
      return { ...state, moves: action.payload as number };
    case "game/best":
      return { ...state, best: action.payload as number };
    case "game/reset":
      return {
        ...initialState,
        prevMatrix: state.prevMatrix.map((row) => row.map(() => 0)),
        matrix: state.matrix.map((row) => row.map(() => 0)),
        rows: state.rows,
        columns: state.columns,
        gap: state.gap,
        font_size: state.font_size,
        tileWidth: state.tileWidth,
        screen: state.screen,
        best: state.best,
        status: state.status,
      };

    case "game/reset_full":
      return { ...initialState, best: state.best };
    default:
      return state;
  }
};
