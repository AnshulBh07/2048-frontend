import React from "react";
import styles from "@/sass/signupFormStyles.module.scss";
import InputField from "../utilities/InputField";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignupForm: React.FC = () => {
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
        Register <span>a new account</span>
      </h2>
      <InputField name="username" type="signup" />
      <InputField name="email" type="signup" />
      <InputField name="password" type="signup" />
      <InputField name="confirm_password" type="signup" />
      <button className={styles.submit_btn} onClick={handleFormSubmit}>
        Register
      </button>

      <p className={styles.separator}>Or</p>

      <button className={styles.google_btn} onClick={handleGoogleClick}>
        <FcGoogle className={styles.google_icon} /> Signup with Google
      </button>

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
