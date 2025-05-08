import React, { useState } from "react";
import { PiTagSimpleFill } from "react-icons/pi";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/sass/inputFieldStyles.module.scss";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";

interface IProps {
  name: string;
  type: string;
}

const InputField: React.FC<IProps> = ({ name, type }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const loginState = useSelector((state: RootState) => state.login);
  const signupState = useSelector((state: RootState) => state.signup);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getIcon = () => {
    const fieldName = name.split("_").join(" ");

    switch (fieldName) {
      case "username":
        return <PiTagSimpleFill className={styles.icon} />;
      case "password":
      case "confirm password":
        return <BsFillKeyFill className={styles.icon} />;
      case "email":
        return <MdEmail className={styles.icon} />;
      default:
        break;
    }
  };

  const getValue = () => {
    if (type === "login") {
      switch (name) {
        case "username":
          return loginState.email || loginState.username || "";
        case "password":
          return loginState.password;
        default:
          return "";
      }
    } else if (type == "signup") {
      switch (name) {
        case "username":
          return signupState.username;
        case "password":
          return signupState.password;
        case "confirm_password":
          return signupState.confirm_password;
        case "email":
          return signupState.email;
        default:
          return "";
      }
    } else return "";
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "password":
        dispatch({ type: "login/password", payload: value });
        break;
      case "username":
        // check if what the user typed in is an email
        if (emailRegex.test(value)) {
          dispatch({ type: "login/email", payload: value });
          dispatch({ type: "login/username", payload: "" });
        } else {
          dispatch({ type: "login/username", payload: value });
          dispatch({ type: "login/email", payload: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        dispatch({ type: "signup/username", payload: value });
        break;
      case "email":
        dispatch({ type: "signup/email", payload: value });
        break;
      case "password":
        dispatch({ type: "signup/password", payload: value });
        break;
      case "confirm_password":
        dispatch({ type: "signup/confirm_password", payload: value });
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "login":
        handleLoginInputChange(e);
        break;
      case "signup":
        handleSignupInputChange(e);
        break;
      default:
        break;
    }
  };

  return (
    <label htmlFor={name} className={styles.container}>
      {/* icon as button */}
      <button
        className={styles.icon_btn}
        onClick={(e) => {
          e.preventDefault();
          if (name.includes("password")) {
            show ? setShow(false) : setShow(true);
          }
        }}
        disabled={!name.includes("password")}
      >
        {getIcon()}
      </button>
      <input
        name={name}
        type={name.includes("password") && !show ? "password" : "text"}
        className={styles.input_field}
        onChange={(e) => handleInputChange(e)}
        value={getValue()}
        placeholder={name.split("_").join(" ")}
      />
    </label>
  );
};

export default InputField;
