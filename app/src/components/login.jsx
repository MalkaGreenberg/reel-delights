import React, { useState } from 'react';
import '../styles/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div>
      {/* <h2>Sign in</h2> */}
      <form className="box" onSubmit={handleSubmit}>
       <h2>Sign In</h2>
        <label className='label'>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} placeholder='example@email.com'/>
        </label>
        <br />
        <label className='label'>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
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