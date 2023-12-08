import React, { useState } from 'react';
import '../styles/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 
import Auth from '../utils/auth';


const Login = () => {
  const [login, {error}] = useMutation(LOGIN_USER);
 
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
       const { data } = await login({
        variables: {...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {/* <h2>Sign in</h2> */}
      <form className="box" onSubmit={handleSubmit}>
       <h2>Sign In</h2>
       <label className='label'>
          Username:
          <input type="text" name="email" value={userFormData.email} onChange={handleInputChange} placeholder='example@email.com'/>
        </label>
        <br />
        <label className='label'>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userFormData.password}
            onChange={handleInputChange}
            placeholder='Enter at least 8+ characters'
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
        <button className="btn" type="submit">Login</button>
        <button className="btn" type="submit">Sign up</button>
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