import React from "react";
import styles from "../../sass/loginStyles.module.scss";
import InputField from "../utilities/InputField";

const Login: React.FC = () => {
  const handleFormSubmit = async () => {};

  return (
    <div className={styles.container}>
      <form action="post" onSubmit={handleFormSubmit}>
        <h2>Welcome</h2>
        <h2>
          Login <span>To your account</span>
        </h2>
        <InputField name="username"/>
        <InputField name="password"/>
        <label htmlFor="remember_me">
            <span>Remember me</span>
            <input type="radio" />
        </label>
        <button></button>
      </form>
    </div>
  );
};

export default Login;
