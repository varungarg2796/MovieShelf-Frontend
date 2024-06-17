import React from 'react';
import { decodeToken } from '../utils/DecodeJwt';
import Cookies from 'js-cookie';


interface User {
  username: string;
  sub: string;
}

export const UserContext = React.createContext({
  username: '',
  sub: '',
  setUsername: (username: string) => { },
  setSub: (sub: string) => { },
  logout: () => { },
});

interface UserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = React.useState('');
  const [sub, setSub] = React.useState('');

  // Load the user's data from the access token when the component mounts
  React.useEffect(() => {
    const token = getCookie('access_token');
    console.log(token);
    if (token) {
      const userData = decodeToken(token); // You would need to implement this function
      if (userData) {
        setUsername(userData.username); // set the username in the UserContext
        setSub(userData.sub); // set the sub in the UserContext
      }
    }
  }, []);

  const logout = () => {
    setUsername(''); // clear the username
    setSub(''); // clear the sub
    Cookies.remove('access_token'); 
  };

  return (
    <UserContext.Provider value={{ username, sub, setUsername, setSub, logout }}>
      {children}
    </UserContext.Provider>
  );
};


function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};