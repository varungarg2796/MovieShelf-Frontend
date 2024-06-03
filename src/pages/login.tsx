import axios from 'axios';
import React, { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/DecodeJwt';
import { UserContext } from '../context/UserContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const { setUsername: setUserNameInContext, setSub } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', {
        username,
        password,
        email
      });

      const { data } = response;
      document.cookie = "access_token=" +  data.access_token + "; path=/";  

      const userData = decodeToken(data.access_token);

      if (userData) {
        setUserNameInContext(userData.username);
        setSub(userData.sub);
      }

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateAccount = () => {
    // Handle account creation logic here
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required className="input input-bordered w-full" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="input input-bordered w-full" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="input input-bordered w-full" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </div>

          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account? 
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;