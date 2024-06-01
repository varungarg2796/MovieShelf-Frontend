import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../pages/login';

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
    <nav className="bg-white p-4 flex justify-between items-center lg:justify-start lg:space-x-10 shadow-lg">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/" className="text-lg font-medium text-gray-900">
            MovieShelf
          </Link>
        </div>
        <div className="-mr-2 -my-2 lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="btn btn-primary">
            Menu
          </button>
        </div>
        <div className="hidden lg:flex lg:space-x-10 items-center">
          <Link to="/my-movie-shelf" className="text-base font-medium text-gray-500 hover:text-gray-900">
            My Movie Shelf
          </Link>
          <button onClick={handleLoginClick} className="btn btn-primary">
            Login
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-lg">
            <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to="/" className="text-lg font-medium text-gray-900">
                      Logo
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button onClick={() => setIsMenuOpen(false)} className="btn btn-error">
                      Close
                    </button>
                  </div>
                </div>
                <div>
                  <Link to="/about" className="block w-full px-5 py-3 text-center font-medium text-gray-500 bg-gray-100 hover:bg-gray-200">
                    About
                  </Link>
                  <button onClick={handleLoginClick} className="btn btn-primary w-full mt-5">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="p-5 bg-white rounded-lg shadow-lg max-w-sm max-h-full w-full relative">
            <button onClick={() => setShowLoginModal(false)} className="btn btn-error absolute top-2 right-2">Close</button>
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;