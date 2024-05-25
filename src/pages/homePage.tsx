import React from 'react';
import Navbar from '../components/navbar';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Search Movies"></input>
      </div>
      {/* Rest of your homepage */}
    </div>
  );
};

export default HomePage;