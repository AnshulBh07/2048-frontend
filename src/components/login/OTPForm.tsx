import React, { useRef, useState } from "react";
import styles from "@/sass/otpFormStyles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const OTPForm: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.signup);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    // move focus on prev box on backspace
    if (value === "" && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(e, index);
  };

  const handleVerifyClick = () => {};

  return (
    <form method="post" className={styles.form}>
      <p>
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
            />
          );
        })}
      </div>

      <button
        className={styles.verify_btn}
        onClick={handleVerifyClick}
      ></button>
    </form>
  );
};

export default OTPForm;
