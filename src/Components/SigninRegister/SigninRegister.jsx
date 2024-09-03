import React, { useState } from "react";
import "./SigninRegister.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const SigninRegister = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Regex for username (e.g., at least 4 characters, no spaces)
    const usernameRegex = /^[A-Za-z0-9_]{4,}$/;

    // Regex for password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;

    // Validate username
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be at least 4 characters long with no spaces."
      );
      valid = false;
    } else {
      setUsernameError("");
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // If both username and password are valid
    if (valid) {
      setSuccessMessage("Sign-in successful!"); // Set success message
      setUsername(""); // Clear the username input
      setPassword(""); // Clear the password input

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box sign">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className={`input-box ${usernameError ? "error" : ""}`}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <FaUser className="icon" />
          </div>
          {usernameError && <p className="error-message">{usernameError}</p>}
          <div className={`input-box ${passwordError ? "error" : ""}`}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit">Sign in</button>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}{" "}
          {/* Display success message */}
        </form>
      </div>
    </div>
  );
};

export default SigninRegister;
