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
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, loginUser } from "@/services/loginRequests";
import { isAxiosError } from "axios";
import {
  CodeResponse,
  GoogleLoginProps,
  useGoogleLogin,
} from "@react-oauth/google";
import { setGameState } from "@/services/helperFunctions";

const LoginForm: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.login);

  const { remember, password, email, username } = loginState;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const controller = new AbortController();

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
    const loginRequest = loginUser(loginState, controller.signal);

    try {
      const response = await toast.promise(loginRequest, {
        pending: "Loggin in",
        error: {
          render(props) {
            const error = (props as any).error;

            if (isAxiosError(error) && error.response?.data)
              return error.response.data;

            return "Something went wrong";
          },
        },
      });

      if (
        response &&
        response.status === 200 &&
        response.data &&
        response.data.userInfo
      ) {
        console.log(response.data);
        if (response.data.userInfo.gameState)
          setGameState(dispatch, response.data.userInfo.gameState);

        dispatch({
          type: "login/username",
          payload: response.data.userInfo.username,
        });
        dispatch({
          type: "login/email",
          payload: response.data.userInfo.email,
        });
        dispatch({
          type: "login/logged",
          payload: true,
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const handleGoogleClick = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse: CodeResponse) => {
      const response = await googleLogin(codeResponse.code, controller.signal);

      if (
        response &&
        response.status === 200 &&
        response.data &&
        response.data.userInfo
      ) {
        console.log(response.data);
        if (response.data.userInfo.gameState)
          setGameState(dispatch, response.data.userInfo.gameState);

        dispatch({
          type: "login/username",
          payload: response.data.userInfo.username,
        });
        dispatch({
          type: "login/email",
          payload: response.data.userInfo.email,
        });
        dispatch({
          type: "login/logged",
          payload: true,
        });
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error("Something went wrong.");
      console.error(error);
    },
  });

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

      <button
        className={styles.google_btn}
        onClick={(e) => {
          e.preventDefault();
          handleGoogleClick();
        }}
      >
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
