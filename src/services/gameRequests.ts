import axios, { AxiosError, isAxiosError } from "axios";
import { IGameState } from "./interfaces";

const BASE_URL = import.meta.env.VITE_BACKEND_URI;

type BaseGameState = Omit<
  IGameState,
  "scoreAnimate" | "slide" | "tileWidth" | "gap" | "font_size" | "screen"
>;

export type ExtendedGameState = BaseGameState & {
  email: string;
  max_tile: number;
};

export const saveGame = async (
  gameObj: ExtendedGameState,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/game/save`,
      data: gameObj,
      signal: signal,
      withCredentials: true,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) return axiosErr.response;
    } else console.log("something went wrong with axios.");

    console.error(err);
  }
};

export const getLeaderboard = async (signal: AbortSignal) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/game/leader_board`,
      signal: signal,
      withCredentials: true,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else console.log("Something went wrong with axios.");
    }
    console.error(err);
  }
};
