import React from 'react';
import Navbar from '../components/navbar';
import ListGroup from '../components/ListGroup';
import Message from '../components/Message';

const HomePage: React.FC = () => {

    return (
        <div>
            <Navbar />
            <div className="flex justify-center h-screen">
                <div className="mt-4">
                    <input
                        type="text"
                        className="input input-bordered w-64"
                        placeholder="Search for your favorite movie"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
