import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/user/context/UserContext";
import { validateRegistration } from "./validation";

function RegisterForm({ onLoginClick }) {
  const { register } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateRegistration(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");

    navigate("/");
  };

  return (
    <div>
      <h2>Create a new account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            aria-label="Full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            aria-label="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

       <textarea
  name="address"
  placeholder="Delivery Address"
  aria-label="Delivery Address"
  maxLength={500}
  rows={4}
  value={formData.address}
  onChange={handleChange}
/>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            aria-label="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Create account</button>
      </form>

      <button type="button" onClick={onLoginClick}>
        Already have an account? Log in
      </button>
    </div>
  );
}

export default RegisterForm;