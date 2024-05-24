import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login

interface LoginProps {
  onSubmit: (username: string, password: string) => void;
  onSignupClick: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onSubmit, onSignupClick }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameOrEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(usernameOrEmail, password); // Call parent function for login logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="usernameOrEmail">Username or Email:</label>
      <input
        type="text"
        id="usernameOrEmail"
        value={usernameOrEmail}
        onChange={handleUsernameOrEmailChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={onSignupClick}>
        Create an Account
      </button>
    </form>
  );
};

export default LoginForm;
