import React, { useEffect, useRef, useState } from "react";
import styles from "@/sass/otpFormStyles.module.scss";
import { useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "@/services/loginRequests";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { playButtonSound } from "@/services/helperFunctions";
import { RootState } from "@/store/rootReducer";

const OTPForm: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.signup);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState<number>(30);
  const [resend, setResend] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isMuted } = useSelector((state: RootState) => state.modal);

  const controller = new AbortController();

  const censorEmail = () => {
    const [name, domain] = email.split("@");

    if (name.length <= 2) return "*".repeat(name.length) + "@" + domain;

    const visible = name.slice(0, 2);
    const censored = "*".repeat(3);
    return `${visible}${censored}@${domain}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      //   move focus to next box
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = e;

    if (key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    playButtonSound(isMuted)
    // first verify wheteher otp is legit or not at frontend
    const otpStr = otp.join("");
    const regex = /^\d{6}$/;

    if (!regex.test(otpStr)) {
      window.alert("invalid otp");
    }

    // send a request to server to verify otp
    const verifyRequest = verifyOtp(
      { email: email, otp: otp.join("") },
      controller.signal
    );

    try {
      const response = await toast.promise(verifyRequest, {
        pending: "Please wait...",
        error: {
          render(toastProps) {
            const error = (toastProps as any).error;

            if (isAxiosError(error) && error.response?.data) {
              return error.response.data;
            }
            return "Something went wrong.";
          },
        },
      });

      // if verification is successful navigate to login
      if (response && response.status === 200) navigate("/login");
    } catch (err) {
      console.error("verification error", err);
    }
  };

  const handleResendClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    playButtonSound(isMuted)

    // make a request to server to resend OTP
    setOtp(new Array(6).fill(""));

    const resendRequest = resendOtp(email, controller.signal);

    try {
      await toast.promise(resendRequest, {
        pending: "Please wait...",
        success: "Please check your email for OTP.",
        error: {
          render(toastProps) {
            const error = (toastProps as any).error;

            if (isAxiosError(error) && error.response?.data) {
              return error.response.data;
            }
            return "Something went wrong";
          },
        },
      });
    } catch (err) {
      console.error("Something went wrong", err);
    }
    setResend(false);
    setTimer(30);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer <= 0) {
        setTimer(0);
        setResend(true);
        clearInterval(intervalId);
      } else setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <form method="post" className={styles.form}>
      <p className={styles.info_text}>
        Please provide the OTP sent to <strong>{censorEmail()}</strong>
      </p>
      <div className={styles.box_container}>
        {otp.map((_, idx) => {
          return (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={otp[idx]}
              ref={(ele) => (inputRefs.current[idx] = ele)}
              onChange={(e) => handleInputChange(e, idx)}
              onKeyDown={(e) => handleKeydown(e, idx)}
              className={styles.input_box}
            />
          );
        })}
      </div>

      <button
        className={styles.verify_btn}
        onClick={(e) => handleVerifyClick(e)}
        disabled={!otp.every((ele) => /^\d$/.test(ele))}
      >
        Verify
      </button>
      {resend ? (
        <button
          className={styles.resend_btn}
          onClick={(e) => handleResendClick(e)}
        >
          Resend OTP
        </button>
      ) : (
        <p className={styles.resend_txt}>
          Resend OTP in <span>{timer}s</span>
        </p>
      )}
    </form>
  );
};

export default OTPForm;
