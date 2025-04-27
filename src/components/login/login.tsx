import React from "react";
import styles from "../../sass/loginStyles.module.scss";
import { Outlet } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Login;
