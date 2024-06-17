import axios from 'axios';
import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/DecodeJwt';
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const { setUsername: setUserNameInContext, setSub } = useContext(UserContext);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const userData = decodeToken(accessToken);
      if (userData && userData.exp && userData.exp * 1000 > Date.now()) {
        // User is already logged in, navigate to home page
        navigate('/');
      }
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', {
        username,
        password,
        email
      });

      const { data } = response;
      document.cookie = "access_token=" + data.access_token + "; path=/";  

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
        <button 
            onClick={() => window.location.href='http://localhost:3000/auth/google'}
            className="btn btn-outline btn-accent w-full flex items-center justify-center space-x-2 mb-4"
          >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google Logo" 
                className="w-5 h-5"
              />
            <span>Sign in with Google</span>
          </button>
          <div className="divider">Or</div>
          <h6 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
            Sign in to your account
          </h6>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
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
              <Link to="/signup" className="font-medium text-primary hover:underline ml-1">
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
