import { on } from 'events';
import { useState } from 'react';

interface ListGroupProps {
    cities: string[];
    heading: string;
    onSelectItem: (city: string) => void;
}


function ListGroup({cities, heading, onSelectItem}: ListGroupProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    // selectedIndex is the variable
    // setSelectedIndex is the function to update the variable
    // useState(-1) is the initial value of the variable
    // each component has its own state

    const handleCityClick = (index: number, city: string) => {
        setSelectedIndex(index);
        onSelectItem(city);
    };

    const cityItems = cities.map((city, index) => (
        <li key={index} className={`p-2 ${selectedIndex === index ? 'bg-blue-500' : ''}`} onClick={() => handleCityClick(index, city)}>
            {city}
        </li>
    ));

    return (
        <>
            <h1>{heading}</h1>
            {cities.length === 0 && <p>No cities found</p>}
            <ul className="bg-gray-200 p-4">
                {cityItems}
            </ul>
        </>
    );
}

export default ListGroup;
