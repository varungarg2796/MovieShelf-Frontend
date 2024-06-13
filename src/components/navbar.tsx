import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // import UserContext
import 'daisyui/dist/full.css'; // import daisyUI for styling

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // state for dropdown
  const navigate = useNavigate();
  const user = useContext(UserContext); // access user data
  const dropdownRef = useRef<HTMLDivElement>(null); // reference for the dropdown

  const handleLoginClick = () => {
    navigate('/login'); 
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // handle logout logic here
    deleteCookie('access_token');
    user.logout();
    navigate('/login');
  };

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  // useEffect to handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white p-4 flex justify-between items-center lg:justify-start lg:space-x-10 shadow-lg">
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
          <Link to="/my-watch-list" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:border-blue-500 py-2">
            My Watch List
          </Link>

          <Link to="/my-watch-history" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:border-blue-500 py-2">
            My Watch History
          </Link>

          <Link to="/recommendations" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:border-blue-500 py-2">
            Recommendations
          </Link>
          {user?.username ? (
            <div className="relative inline-block text-left w-60">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="inline-flex justify-center w-full rounded-lg shadow-lg px-4 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
                <div className="bg-blue-500 text-white w-full h-12 rounded-full flex items-center justify-center text-xl">
                  Hello, {user?.username} 👋
                </div>
              </button>
              {dropdownOpen && (
                <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => {}} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded" role="menuitem">Your Profile</button>
                    <button onClick={handleLogout} className="w-full block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded" role="menuitem">Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLoginClick} className="btn btn-primary">
              Login
            </button>
          )}
        </div>
      </nav>
      {isMenuOpen && (
        <nav className="sticky z-50 absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-lg">
            <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to="/" className="text-lg font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>
                      MovieShelf
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button onClick={() => setIsMenuOpen(false)} className="btn btn-error">
                      Close
                    </button>
                  </div>
                </div>
                <div>
                  <Link to="/about" className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    About
                  </Link>
                  <Link to="/my-watch-list" className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg mt-2" onClick={() => setIsMenuOpen(false)}>
                    My Watch List
                  </Link>
                  <Link to="/my-watch-history" className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg mt-2" onClick={() => setIsMenuOpen(false)}>
                    My Watch History
                  </Link>
                  <Link to="/recommendations" className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg mt-2" onClick={() => setIsMenuOpen(false)}>
                    Recommendations
                  </Link>
                  {user?.username ? (
                    <div className="relative inline-block text-left w-full">
                      <button onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="inline-flex justify-center w-full rounded-lg shadow-lg px-4 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
                        <div className="bg-blue-500 text-white w-full h-12 rounded-full flex items-center justify-center text-xl">
                          Hello, {user?.username} 👋
                        </div>
                      </button>
                      {dropdownOpen && (
                        <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button onClick={() => {}} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded" role="menuitem">Your Profile</button>
                            <button onClick={handleLogout} className="w-full block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded" role="menuitem">Logout</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button onClick={handleLoginClick} className="btn btn-primary w-full mt-5">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
