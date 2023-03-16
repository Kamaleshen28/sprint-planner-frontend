import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
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

  const [isPasswordMatch, setIsPaswwordMatch] = useState(true);
  const [userCreatedSuccessfully, setUserCreatedSuccessfully] = useState(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const [loginErrorText, setLoginErrorText] = useState();

  const handleAccountConfirmationClick = () => {
    setHaveAccount((previousValue) => !previousValue);
  };

  const handleRegisterDetailChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    if (name === 'username') {
      setUserAlreadyExist(false);
    }
    if (name === 'password' || name === 'confirmPassword') {
      setIsPaswwordMatch(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    if (name === 'username') {
      setUserNotFound(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (registerFormData.password === registerFormData.confirmPassword) {
      setIsPaswwordMatch(true);
      await callCreateUserAPI(registerFormData);
    } else {
      setIsPaswwordMatch(false);
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await sendLoginData(formData);
  };

  const sendLoginData = async (loginCredentials) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: loginCredentials.username,
        password: loginCredentials.password,
      });

      if (response.data.message === 'User logged in successfully') {
        localStorage.setItem('accessToken', response.data.data.access_token);
        navigate('/create');
      }
    } catch (error) {
      setLoginErrorText(error.response.data.message);
      setUserNotFound(true);
    }
  };

  const callCreateUserAPI = async (userDetails) => {
    try {
      await axios.post('http://localhost:8080/auth/signup', {
        username: userDetails.username,
        password: userDetails.password,
      });
      setUserCreatedSuccessfully(true);
      setHaveAccount(true);
    } catch (error) {
      setUserAlreadyExist(true);
    }
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
              {userNotFound && (
                <span className="user-not-found-text">{loginErrorText}</span>
              )}
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
              {!isPasswordMatch && (
                <span className="password-does-not-match-text">
                  Password and confirm password must match.
                </span>
              )}
              {userCreatedSuccessfully && (
                <span className="success-text">User created successfully</span>
              )}
              {userAlreadyExist && (
                <span className="user-exist-text">User already exist</span>
              )}
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
