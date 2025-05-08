export type coordinates = [number, number];

export type position = {
  isMerged: boolean;
  value: number;
  initialCoords: { row: number; column: number };
  finalCoords: { row: number; column: number };
};

export type positionSchema = {
  isMerged: boolean;
  value: number;
  initialCoords: { x: number; y: number };
  finalCoords: { x: number; y: number };
};

export interface IUserInfo {
  prevMatrix: number[][];
  matrix: number[][];
  maxScore: number;
  currScore: number;
  moves: number;
  gameStatus: string;
  bestScore: number;
  rows: number;
  columns: number;
  undo: boolean;
  newTileCoords: [{ x: number; y: number }];
  positionsArr: positionSchema[]; //matrix that stores the initial and final position of each ele along with value
}

export interface IGameState {
  prevMatrix: number[][];
  matrix: number[][];
  maxScore: number;
  currScore: number;
  moves: number;
  status: string;
  best: number;
  rows: number;
  columns: number;
  undo: boolean;
  scoreAnimate: boolean;
  slide: boolean;
  tileWidth: number;
  gap: number;
  font_size: number;
  screen: string;
  newTileCoords: coordinates[];
  positionsArr: position[]; //matrix that stores the initial and final position of each ele along with value
}

export interface ILoginState {
  username: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  remember: boolean;
  showModal: boolean;
  isMusicEnabled: boolean;
}

export interface ISignupState {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  isVerified: boolean;
}

export interface ILeaderboard {
  username: string;
  max_tile: number;
  score: number;
}

export interface IModalState {
  leaderBoardModal: boolean;
  guideModal: boolean;
  gameOverModal: boolean;
  gameWinModal: boolean;
  gameContinueModal: boolean;
  isMuted: boolean;
}
