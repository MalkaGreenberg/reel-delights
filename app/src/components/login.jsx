import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN_USER);

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    navigate("/signup", { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      if (!userFormData.email || !userFormData.password) {
        setErrorMessage('Please enter both email and password.');
        setShowAlert(true);
        return;
      }

      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);


    } catch (err) {
      console.error(err);
      setShowAlert(true);

      if (err.message.includes('password')) {
        setErrorMessage('Incorrect password. Please try again.');
      } else if (err.message.includes('user')) {
        setErrorMessage('User not found. \n incorrect password or email.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="bigBox">
      <form className="box" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label className='label'>
          Username:
          <input type="text" name="email" value={userFormData.email} onChange={handleInputChange} placeholder='example@email.com' required />
        </label>
        <br />
        <label className='label'>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userFormData.password}
            onChange={handleInputChange}
            placeholder='password'
            required
          />
          <span onClick={handleTogglePassword}>{showPassword ? '🙈' : '👁️'}</span>
        </label>
        <br />
        <label className='label'>
          <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
          Remember me
        </label>
        <br />
        <a href="/forgot-password">Forgot your password?</a>
        <br />
        {showAlert && (
          <div className="error-notification">
            {errorMessage}
          </div>
        )}
        <button className="loginBtn" type="submit">Login</button>
        <button className="loginBtn" onClick={handleSignup}>Sign Up</button>
      </form>

      <p className="altSignIn">Or sign in with</p>
      <div>
        <a href="/auth/google">Sign in with Google</a>
        <br />
        <a href="/auth/facebook">Sign in with Facebook</a>
        <br />
        <a href="/auth/apple">Sign in with Apple</a>
      </div>
    </div>
  );
};

export default Login;
