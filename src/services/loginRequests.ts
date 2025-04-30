import axios, { AxiosError, isAxiosError } from "axios";
import { ILoginState, ISignupState } from "./interfaces";

type otpObj = { email: string; otp: string };

const BASE_URL = import.meta.env.VITE_BACKEND_URI;

export const loginUser = async (
  loginInfo: ILoginState,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/login`,
      data: loginInfo,
      signal: signal,
      withCredentials: true,
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
      url: `${BASE_URL}/signup`,
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

export const verifyOtp = async (otpObj: otpObj, signal: AbortSignal) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/signup/verifyOTP`,
      data: otpObj,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else console.log("Network error");
    }
    console.error(err);
  }
};

export const resendOtp = async (email: string, signal: AbortSignal) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${BASE_URL}/signup/resendOTP`,
      data: { email: email },
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else console.log("Network error");
    }
    console.error(err);
  }
};
