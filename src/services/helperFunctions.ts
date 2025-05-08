import { AppDispatch } from "@/store";
import {
  coordinates,
  IGameState,
  IUserInfo,
  positionSchema,
} from "./interfaces";
import ButtonSound from "@/assets/sounds/button_click.wav";
import SlideTileSound from "@/assets/sounds/slide_tile.wav";
import Errorsound from "@/assets/sounds/error.flac";
import PopupSound from "@/assets/sounds/pop_up.wav";

export const generateStartMatrix: (
  x: number,
  y: number
) => [number[][], coordinates[]] = (rows, columns) => {
  const matrix = new Array(rows)
    .fill(null)
    .map(() => new Array(columns).fill(0));

  const coordsArr: coordinates[] = [];

  // now we need to generate three random numbers between 1 and rows x columns for starter tiles, these starter tiles will contain number 2
  //   while generating make sure that an index that has already been generated is not generated twice, for that we use a set
  const st = new Set<coordinates>();
  let count = 0;

  while (count < 3) {
    const index1 = Math.floor(Math.random() * rows);
    const index2 = Math.floor(Math.random() * columns);

    if (!st.has([index1, index2])) {
      st.add([index1, index2]);
      matrix[index1][index2] = 2;
      coordsArr.push([index1, index2]);
      count++;
    }
  }

  return [matrix, coordsArr];
};

const delrow = [0, 1, 0, -1];
const delcol = [1, 0, -1, 0];

const isMergePossible = (
  row: number,
  col: number,
  matrix: number[][],
  vis: number[][],
  dp: number[][]
): boolean => {
  const m = matrix.length;
  const n = matrix[0].length;

  if (row < 0 || row >= m || col < 0 || col >= n || vis[row][col]) return false;

  vis[row][col] = 1;

  let ans = false;

  for (let i = 0; i < 4; i++) {
    const nrow = row + delrow[i];
    const ncol = col + delcol[i];

    if (
      nrow >= 0 &&
      nrow < m &&
      ncol >= 0 &&
      ncol < n &&
      matrix[row][col] === matrix[nrow][ncol]
    ) {
      return true; // Found a merge possibility
    }

    ans = ans || isMergePossible(nrow, ncol, matrix, vis, dp);
  }

  dp[row][col] = ans ? 1 : 0;
  return ans;
};

// the game ends if a merge is no more possible and there are no empty slots to spawn a new tile
export const isEndOfGame = (matrix: number[][]): boolean => {
  const m = matrix.length;
  const n = matrix[0].length;

  const vis = new Array(m).fill(null).map(() => new Array(n).fill(0));
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(-1));

  let isMergable = false;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!vis[i][j]) {
        isMergable = isMergePossible(i, j, matrix, vis, dp);
        if (isMergable) break; // No need to check further if a merge is possible
      }
    }
    if (isMergable) break;
  }

  const hasEmptySlots = matrix.flat().some((ele) => ele === 0);

  return !isMergable && !hasEmptySlots;
};

export const generateNewTile: (
  x: number,
  y: number,
  arr: number[][]
) => [boolean, number[][], coordinates[]] = (rows, columns, matrix) => {
  // a new tile is only generated if there is a zero in the matrix
  // new tile generated is always 2
  // if a new tile is able to generate return true, else return false that will signal game over

  // first check if we can generate a new tile, if no then return false
  // for this maintain an array and traverse the matrix to store indices of all 0s
  type coordinates = [number, number];
  const emptySlots: coordinates[] = [];
  let coordArr: coordinates[] = [[-1, -1]];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j] === 0) emptySlots.push([i, j]);
    }
  }

  if (emptySlots.length === 0) return [false, matrix, coordArr];

  //   select random coordinate from empty slots
  const index = Math.floor(Math.random() * emptySlots.length);
  const [row, col] = emptySlots[index];

  //   do not do const newMatrix = matrix as it only creates a new reference not a new array
  //   changes made in newMatrix will also be reflected in matrix that way
  const newMatrix = matrix.map((row) => [...row]);
  newMatrix[row][col] = 2;
  coordArr = [[row, col]];

  return [true, newMatrix, coordArr];
};

// function that decides value of bg color and number color based on value
export const decideColorFn: (x: number | null) => [string, string] = (
  value
) => {
  switch (value) {
    case null:
      return ["#cdc1b4", ""];
    case 2:
      return ["#eee4da", "#776e65"];
    case 4:
      return ["#ede0c8", "#776e65"];
    case 8:
      return ["#f2b179", "#f9f6f2"];
    case 16:
      return ["#f59563", "#f9f6f2"];
    case 32:
      return ["#f67c5f", "#f9f6f2"];
    case 64:
      return ["#f65e3b", "#f9f6f2"];
    case 128:
      return ["#edcf72", "#f9f6f2"];
    case 256:
      return ["#edcc61", "#f9f6f2"];
    case 512:
      return ["#edc850", "#f9f6f2"];
    case 1024:
      return ["#edc53f", "#f9f6f2"];
    case 2048:
      return ["#edc22e", "#f9f6f2"];
    case 4096:
      return ["#edc22e", "#f9f6f2"];
    case 8192:
      return ["#edc22e", "#f9f6f2"];
    default:
      return ["#cdc1b4", ""];
  }
};

export const calculateGameState: (
  state: IGameState,
  type: string
) => IGameState = (state, type) => {
  switch (type) {
    case "4x4":
      return {
        ...state,
        rows: 4,
        columns: 4,
        gap: 0.5,
        tileWidth: 6.5,
        font_size: 2.5,
        prevMatrix: new Array(4).fill(null).map(() => new Array(4).fill(0)),
        matrix: new Array(4).fill(null).map(() => new Array(4).fill(0)),
      };
    case "5x5":
      return {
        ...state,
        rows: 5,
        columns: 5,
        gap: 0.4,
        tileWidth: 5.2,
        font_size: 2,
        prevMatrix: new Array(5).fill(null).map(() => new Array(5).fill(0)),
        matrix: new Array(5).fill(null).map(() => new Array(5).fill(0)),
      };
    case "6x6":
      return {
        ...state,
        rows: 6,
        columns: 6,
        gap: 0.4,
        tileWidth: 4.3,
        font_size: 1.75,
        prevMatrix: new Array(6).fill(null).map(() => new Array(6).fill(0)),
        matrix: new Array(6).fill(null).map(() => new Array(6).fill(0)),
      };
    case "8x8":
      return {
        ...state,
        rows: 8,
        columns: 8,
        gap: 0.25,
        tileWidth: 3.25,
        font_size: 1.25,
        prevMatrix: new Array(8).fill(null).map(() => new Array(8).fill(0)),
        matrix: new Array(8).fill(null).map(() => new Array(8).fill(0)),
      };
    default:
      return state;
  }
};

export const hasWon: (matrix: number[][]) => boolean = (matrix) => {
  return matrix.flat().some((value) => value === 2048);
};

export const calculateValues: (
  a: number,
  b: number,
  c: number,
  d: string
) => [number, number, number] = (tileWidth, gap, font_size, screen) => {
  switch (screen) {
    case "mobile":
      return [
        tileWidth - (tileWidth * 30) / 100,
        gap - (gap * 30) / 100,
        font_size - (font_size * 30) / 100,
      ];
    default:
      return [tileWidth, gap, font_size];
  }
};

export const setGameState = (dispatch: AppDispatch, gameState: IUserInfo) => {
  dispatch({
    type: "game/set_game",
    payload: `${gameState.rows}x${gameState.columns}`,
  });
  dispatch({ type: "game/set_matrix", payload: gameState.matrix });
  dispatch({ type: "game/set_prev", payload: gameState.prevMatrix });
  dispatch({ type: "game/set_undo", payload: gameState.undo });
  dispatch({ type: "game/moves", payload: gameState.moves });
  dispatch({ type: "game/best", payload: gameState.bestScore });
  dispatch({ type: "game/set_maxScore", payload: gameState.maxScore });
  dispatch({ type: "game/set_currScore", payload: gameState.currScore });
  dispatch({
    type: "game/set_positions",
    payload: gameState.positionsArr.map((pos: positionSchema) => {
      return {
        isMerged: pos.isMerged,
        value: pos.value,
        initialCoords: { row: pos.initialCoords.x, col: pos.initialCoords.y },
        finalCoords: { row: pos.finalCoords.x, col: pos.finalCoords.y },
      };
    }),
  });
  dispatch({
    type: "game/set_new_tile_coords",
    payload: gameState.newTileCoords.map((coord) => {
      return [coord.x, coord.y];
    }),
  });
  dispatch({ type: "game/set_status", payload: gameState.gameStatus });
  dispatch({ type: "modal/game_continue", payload: true });
};

export const playButtonSound = (isMuted: boolean) => {
  const audio = new Audio(ButtonSound);

  audio.volume = 0.7;

  if (!isMuted) audio.play();
};

export const playSlideTileSound = (isMuted: boolean) => {
  const audio = new Audio(SlideTileSound);

  audio.volume = 1;

  if (!isMuted) audio.play();
};

export const playErrorSound = (isMuted: boolean) => {
  const audio = new Audio(Errorsound);

  audio.volume = 1;

  if (!isMuted) audio.play();
};

export const playPopupSound = (isMuted: boolean) => {
  const audio = new Audio(PopupSound);

  audio.volume = 1;

  if (!isMuted) audio.play();
};
