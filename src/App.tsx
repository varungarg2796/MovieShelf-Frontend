import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';
import HomePage from './pages/homePage';
import SignupPage from './pages/Signup';
import Navbar from './components/navbar';
import { UserProvider } from './context/UserContext';
import WatchList from './pages/WatchList';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my-movie-shelf" element={<WatchList />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;