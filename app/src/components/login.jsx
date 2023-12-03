import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} placeholder='example@email.com'/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} placeholder='Enter at least 8+ characters'/>
        </label>
        <br />
        <label>
          <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
          Remember me
        </label>
        <br />
        <a href="/forgot-password">Forgot your password?</a>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;