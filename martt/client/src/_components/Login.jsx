/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../_styles/login.scss";
import axios from "axios";
import { userApi } from "../_constants/api-urls";

const Login = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleReg, setToggle] = useState(false);
  const [formData, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  // Cleanup event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (toggleReg) {
          handleRegister();
        } else {
          handleLogin();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleReg, formData]); // Dependencies to ensure correct behavior

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { email, password, first_name, last_name } = formData;

    if (!email || !password || !first_name || !last_name) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${userApi}/new`, {
        email,
        password,
        first_name,
        last_name,
      });

      setErrorMessage(""); // Reset error message

      if (res.status === 201) {
        window.localStorage.setItem("_martt_auth", res.data.hashedData);
        window.location.reload(); // Reload the page after successful registration
      } else if (res.status === 409) {
        setErrorMessage(res.data.msg); // User already exists
      } else if (res.status === 400) {
        setErrorMessage(res.data.msg); // Bad request (missing fields)
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "An error occurred during registration."
      );
    }
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${userApi}/login`, {
        email,
        password,
      });

      setErrorMessage(""); // Reset error message

      if (res.status === 200) {
        window.localStorage.setItem("_martt_auth", res.data.hashedData);
        window.location.reload(); // Reload the page after successful login
      } else if (res.status === 404) {
        setErrorMessage("User not found.");
      } else if (res.status === 401) {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-container flex" onClick={onClose}>
      <div className="main-form flex col" onClick={(e) => e.stopPropagation()}>
        <div className="input-wrap flex col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleData}
          />
        </div>

        <div className="input-wrap flex col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleData}
          />
        </div>

        {toggleReg && (
          <>
            <div className="input-wrap flex col">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleData}
              />
            </div>

            <div className="input-wrap flex col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleData}
              />
            </div>
          </>
        )}

        {errorMessage && (
          <p className="text" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}

        <button
          className="btn-login flex"
          onClick={toggleReg ? handleRegister : handleLogin}
        >
          {toggleReg ? "REGISTER" : "LOGIN"}
        </button>

        {toggleReg ? (
          <p className="text flex">Privacy policy & user agreement?</p>
        ) : (
          <p className="text flex">Have you forgotten your password?</p>
        )}

        <button className="btn-reg flex" onClick={() => setToggle(!toggleReg)}>
          {toggleReg ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
