import axios, { AxiosError, isAxiosError } from "axios";
import { ILoginState, ISignupState } from "./interfaces";

export const loginUser = async (
  loginInfo: ILoginState,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: loginInfo,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else console.log("Network error...");
    }

    console.error(err);
  }
};

export const signinUser = async (
  signupInfo: ISignupState,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/signup",
      data: signupInfo,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else console.log("Network error...");
    }

    console.error(err);
  }
};
