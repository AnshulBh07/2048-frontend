import React from "react";
import styles from "@/sass/signupFormStyles.module.scss";
import InputField from "../utilities/InputField";
// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/services/formValidations";
import { toast } from "react-toastify";
import { signinUser } from "@/services/loginRequests";
import { isAxiosError } from "axios";
import { playButtonSound } from "@/services/helperFunctions";
import { RootState } from "@/store/rootReducer";

const SignupForm: React.FC = () => {
  const signupState = useSelector((state: RootState) => state.signup);
  const { username, email, password, confirm_password } = signupState;
  const { isMuted } = useSelector((state: RootState) => state.modal);

  const navigate = useNavigate();

  const controller = new AbortController();

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    playButtonSound(isMuted);
    e.preventDefault();
    // console.log("sign up info is :", signupState);
    // validate here
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const usernameValidation = validateUsername(username);

    if (!usernameValidation[0]) {
      toast.error(usernameValidation[1]);
      return;
    }

    if (!emailValidation[0]) {
      toast.error(emailValidation[1]);
      return;
    }

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordValidation[0]) {
      toast.error(passwordValidation[1]);
      return;
    }

    const signupRequest = signinUser(signupState, controller.signal);

    try {
      const response = await toast.promise(signupRequest, {
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

      if (response && response.status === 200) {
        navigate("/login/signup/verify");
      }
    } catch (err) {
      console.error("sign up error", err);
    }
  };

  // const handleGoogleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  // };

  return (
    <form action="post" className={styles.form}>
      <h2 className={styles.header1}>Welcome</h2>
      <h2 className={styles.header2}>
        Register <span>a new account</span>
      </h2>
      <InputField name="username" type="signup" />
      <InputField name="email" type="signup" />
      <InputField name="password" type="signup" />
      <InputField name="confirm_password" type="signup" />
      <button className={styles.submit_btn} onClick={handleFormSubmit}>
        Register
      </button>

      {/* <p className={styles.separator}>Or</p>

      <button className={styles.google_btn} onClick={handleGoogleClick}>
        <FcGoogle className={styles.google_icon} /> Signup with Google
      </button> */}

      <p className={styles.link_text}>
        Already have an account?{" "}
        <Link to={"/login"} className={styles.link}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
