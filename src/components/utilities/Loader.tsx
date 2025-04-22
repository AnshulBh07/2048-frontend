import React from "react";
import styles from "../../sass/spinnerStyles.module.scss";
import Logo from "../../assets/images/logo.png";

const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="logo for game" className={styles.logo} />
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
