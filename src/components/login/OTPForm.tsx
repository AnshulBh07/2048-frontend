import React, { useEffect, useRef, useState } from "react";
import styles from "@/sass/otpFormStyles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const OTPForm: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.signup);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState<number>(30);
  const [resend, setResend] = useState<boolean>(false);

  const censorEmail = () => {
    const [name, domain] = email.split("@");

    if (name.length <= 2) return "*".repeat(name.length) + "@" + domain;

    const visible = name.slice(0, 2);
    const censored = "*".repeat(name.length - 2);
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

  const handleVerifyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // first verify wheteher otp is legit or not at frontend
    const otpStr = otp.join("");
    const regex = /^\d{6}$/;

    if (!regex.test(otpStr)) {
      window.alert("invalid otp");
    }

    // send a request to server to verify otp
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
      <p>
        Resend OTP in <span>{timer}s</span>
      </p>
    </form>
  );
};

export default OTPForm;
