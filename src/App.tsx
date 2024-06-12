import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';
import HomePage from './pages/homePage';
import SignupPage from './pages/Signup';
import Navbar from './components/navbar';
import { UserProvider } from './context/UserContext';
import WatchList from './pages/WatchList';
import WatchHistory from './pages/WatchHistory';
import Recommendations from './pages/Recommendations';
import AuthGuard from './guards/AuthGuard';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my-watch-list" element={<WatchList />} />
          <Route path="/my-watch-history" element={<WatchHistory />} />
            <Route path="/recommendations" element={<AuthGuard><Recommendations /> </AuthGuard>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;