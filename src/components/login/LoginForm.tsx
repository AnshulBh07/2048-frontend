import React from "react";
import styles from "@/sass/loginFormStyles.module.scss";
import InputField from "../utilities/InputField";
import { IoCheckbox } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const LoginForm: React.FC = () => {
  const { remember } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    </form>
  );
};

export default LoginForm;
