import React from "react";
import styles from "@/sass/loginFormStyles.module.scss";
import InputField from "../utilities/InputField";
import { IoCheckbox } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/services/formValidations";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { remember, password, email, username } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch: AppDispatch = useDispatch();

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // check form validation
    const passwordValidate = validatePassword(password);

    const userValidate =
      username.length > 0 ? validateUsername(username) : validateEmail(email);

    if (!userValidate[0]) {
      toast.error(userValidate[1]);
      return;
    }

    if (!passwordValidate[0]) {
      toast.error(passwordValidate[1]);
      return;
    }

    // send a request to server logging in
  };

  const handleGoogleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form action="post" className={styles.form}>
      <h2 className={styles.header1}>Welcome</h2>
      <h2 className={styles.header2}>
        Login <span>to your account</span>
      </h2>
      <InputField name="username" type="login" />
      <InputField name="password" type="login" />
      <label htmlFor="remember_me" className={styles.remember}>
        Remember me
        <span className={styles.box}>
          {remember && <IoCheckbox style={{ height: "100%", width: "100%" }} />}
        </span>
        <input
          type="checkbox"
          name="remember_me"
          id="remember_me"
          onChange={() =>
            dispatch({ type: "login/remember", payload: !remember })
          }
        />
      </label>
      <button className={styles.submit_btn} onClick={handleFormSubmit}>
        Enter
      </button>

      <p className={styles.separator}>Or</p>

      <button className={styles.google_btn} onClick={handleGoogleClick}>
        <FcGoogle className={styles.google_icon} /> Login with Google
      </button>

      <p className={styles.link_text}>
        New user?{" "}
        <Link to={"/login/signup"} className={styles.link}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
