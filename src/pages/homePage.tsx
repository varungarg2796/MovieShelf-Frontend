import React from 'react';
import Navbar from '../components/navbar';
import {UserContext} from '../context/UserContext'; // adjust the import path to where your UserContext is located

const HomePage: React.FC = () => {

    const user = React.useContext(UserContext);
    console.log(user)
    return (
        <div>
            <div className="flex justify-center h-screen">
                <div className="mt-4">
                    <input
                        type="text"
                        className="input input-bordered w-64"
                        placeholder="Search for your favorite movie"
                    />
                </div>
            </div>

           <div>Welcome, {user?.username}!</div>;
           <div>Welcome, {user?.sub}!</div>;

        </div>
    );
};

export default HomePage;
