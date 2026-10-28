import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/user/context/UserContext";
import { validateLogin } from "./validation";

function LoginForm({ onRegisterClick }) {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateLogin(email, password);

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");

    navigate("/");
  };

  return (
    <div>
      <h2>Log in to MyStore</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Log in</button>
      </form>

      <button type="button">Forgot password?</button>

      <button type="button" onClick={onRegisterClick}>
        Create new account
      </button>
    </div>
  );
}

export default LoginForm;