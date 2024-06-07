import { useState, useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // import UserContext
import 'daisyui/dist/full.css'; // import daisyUI for styling

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // state for dropdown
  const navigate = useNavigate()
  const user = useContext(UserContext); // access user data

  const handleLoginClick = () => {
    navigate('/login'); 
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
            My Watch List
          </Link>
          {user?.username ? (
          <div className="relative inline-block text-left">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="inline-flex justify-center w-full rounded-md shadow-lg px-4 py-2 bg-blue-600 text-sm font-medium text-black hover:text-gray-700 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Hey, {user?.username}
            </button>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
            {user?.username ? (
              <div className="relative inline-block text-left">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="inline-flex justify-center w-full rounded-md shadow-lg px-4 py-2 bg-blue-600 text-sm font-medium text-black hover:text-gray-700 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
                  Hey, {user?.username}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 6a4 4 0 100 8 4 4 0 000-8zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </button>
                {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
  </div>
)}
    </>
  );
};

export default Navbar;