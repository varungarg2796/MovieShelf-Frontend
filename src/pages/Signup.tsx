import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { decodeToken } from '../utils/DecodeJwt';
import Cookies from 'js-cookie';



const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const [formUserName, setformUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { setUsername, setSub }: { setUsername: (username: string) => void; setSub: (sub: string) => void } = useContext(UserContext);

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
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username: formUserName,
        email,
        password
      });
  
      const { data } = response;
      document.cookie = "access_token=" +  data.access_token + "; path=/";  

      const userData = decodeToken(data.access_token);

      if (userData) {
        setUsername(userData.username);
        setSub(userData.sub);
      }

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g. show error message)
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="formUserName" className="sr-only">UserName</label>
              <input id="formUserName" name="formUserName" type="text" required className="input input-bordered w-full" placeholder="UserName" value={formUserName} onChange={e => setformUserName(e.target.value)} />
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
              Sign Up
            </button>
          </div>

          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account? 
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;