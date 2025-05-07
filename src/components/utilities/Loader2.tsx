import React from "react";
import styles from "@/sass/loader2Styles.module.scss";
import Logo from "@/assets/images/logo.png";

const Loader2: React.FC = () => {
  return (
    <div className={styles.container}>
      <img alt="game logo" src={Logo} className={styles.logo} />
      <span className={styles.shadow}></span>
    </div>
  );
};

export default Loader2;
