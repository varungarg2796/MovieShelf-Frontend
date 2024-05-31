import React from 'react';
import Navbar from '../components/navbar';
import ListGroup from '../components/ListGroup';
import Message from '../components/Message';


const HomePage: React.FC = () => {

const IndianCities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
const AustralianCities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
const handleSelectItem = (city: string) => {
    console.log(city);
};
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Search Movies"></input>
      </div>

      <div className="flex flex-wrap">
        <ListGroup cities={IndianCities} heading='Indian Cities' onSelectItem={handleSelectItem} />
        <ListGroup cities={AustralianCities} heading='Australian Cities' onSelectItem={handleSelectItem} />
      </div>

      <div>
        <Message message="This is a message" />
      </div>
      {/* Rest of your homepage */}
    </div>
  );
};

export default HomePage;