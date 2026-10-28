import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import styles from "./Login.module.css";

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={styles.page}>
      {showRegister ? (
        <RegisterForm onLoginClick={() => setShowRegister(false)} />
      ) : (
        <LoginForm onRegisterClick={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default Login;