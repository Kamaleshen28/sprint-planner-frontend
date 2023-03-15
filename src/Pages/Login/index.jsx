import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

export default function Login() {
  const [haveAccount, setHaveAccount] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleAccountConfirmationClick = () => {
    setHaveAccount((previousValue) => !previousValue);
  };

  const handleRegisterDetailChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerFormData.password === registerFormData.confirmPassword) {
      callCreateUserAPI(registerFormData);
    }
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    sendLoginData(formData);
  };

  const sendLoginData = async (loginCredentials) => {
    console.log('clicked login button');
  };

  const callCreateUserAPI = async (userDetails) => {
    console.log('clicked register button');
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="form-container">
          {haveAccount && (
            <form className="form" onSubmit={handleLoginSubmit}>
              <span className="username-text">Username</span>
              <input
                type="text"
                className="form-input"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
              <br />
              <span className="password-text">Password</span>
              <input
                type="password"
                className="form-input"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <br />
              <button className="submit-button">Login</button>
            </form>
          )}
          {!haveAccount && (
            <form className="form" onSubmit={handleRegisterSubmit}>
              <span className="username-text">Username</span>

              <input
                type="text"
                className="form-input"
                value={registerFormData.username}
                name="username"
                onChange={handleRegisterDetailChange}
              />
              <br />
              <span className="password-text">Password</span>

              <input
                type="password"
                className="form-input"
                value={registerFormData.password}
                name="password"
                onChange={handleRegisterDetailChange}
              />
              <br />
              <span className="password-text">Confirm Password</span>

              <input
                type="password"
                className="form-input"
                value={registerFormData.confirmPassword}
                name="confirmPassword"
                onChange={handleRegisterDetailChange}
              />
              <br />
              <button className="submit-button">Register</button>
            </form>
          )}
          <div className="confirmation-text">
            {!haveAccount && (
              <span className="login-confirmation">
                Already have an account?{' '}
                <span
                  className="login-text"
                  onClick={handleAccountConfirmationClick}
                >
                  Login
                </span>
              </span>
            )}
            {haveAccount && (
              <span className="register-confirmation">
                Dont have an account?{' '}
                <span
                  className="register-text"
                  onClick={handleAccountConfirmationClick}
                >
                  Register
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
