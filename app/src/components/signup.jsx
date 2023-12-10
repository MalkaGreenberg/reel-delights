import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const navigate = useNavigate();
  const [addUser, { loading: addUserLoading, error: addUserError }] = useMutation(ADD_USER);
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!username || !password) {
        throw new Error('Please enter both username and password.');
      }

      // Call the addUser mutation
      const { data: addUserData } = await addUser({
        variables: { username, email: username, password },
      });

      console.log('User added:', addUserData.addUser);

      // If addUser mutation is successful, proceed with login
      if (addUserData) {
        const { data: loginData } = await login({
          variables: { email: username, password },
        });
        
        Auth.login(loginData.login.token);

        // Navigate to the desired page upon successful signup and login
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);

      // Set error state based on the error message
      setError(err.message || 'An error occurred while signing up.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {(addUserError || loginError) && <div className="error">{(addUserError || loginError).message}</div>}
      <div>
        <button type="submit" disabled={addUserLoading || loginLoading}>
          {addUserLoading || loginLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
