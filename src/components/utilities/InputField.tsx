import React, { useState } from "react";
import { PiTagSimpleFill } from "react-icons/pi";
import { BsFillKeyFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import styles from "@/sass/inputFieldStyles.module.scss";

interface IProps {
  name: string;
}

const InputField: React.FC<IProps> = ({ name }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const getIcon = () => {
    switch (name) {
      default:
        break;
    }
  };

  const handleInputChange = () => {
    switch (name) {
      default:
        break;
    }
  };

  return (
    <label htmlFor={name} className={styles.container}>
      {/* icon as button */}
      <button
        onClick={() => {
          if (name.includes("password")) {
            show ? setShow(false) : setShow(true);
          }
        }}
        disabled={!name.includes("password")}
      >
        <PiTagSimpleFill />
      </button>
      <input type={name.includes("password") && !show ? "password" : "text"} />
    </label>
  );
};

export default InputField;
