import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './WatchList.css';
import Cookies from 'js-cookie';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
};

interface WatchlistItems {
    watchlistid: number;
    createdon: string; // Date in ISO 8601 format
    imdbid: {
        imdbid: string;
        title: string;
        year: number;
        rated: string;
        released: string; // Date in YYYY-MM-DD format
        runtime: number;
        genre: string[];
        director: string;
        writers: string[];
        actors: string[];
        plot: string;
        languages: string[];
        country: string[];
        awards: string;
        poster: string;
        metascore: string | null; // Can be null
        imdbrating: string;
        imdbvotes: number;
        box_office: string;
        production: string;
    };
}

const WatchList: React.FC = () => {

    const accessToken = Cookies.get('access_token');
    const [items, setItems] = useState([]);
    const [averageRuntime, setAverageRuntime] = useState(0);
    const [averageImdbRating, setAverageImdbRating] = useState(0);
    const [totalWatchlistDuration, setTotalWatchlistDuration] = useState(0);

    const currentDate = new Date();

    const calculateAverages = (items: any[]) => {
        let totalRuntime = 0;
        let totalImdbRating = 0;

        items.forEach(item => {
            totalRuntime += item.imdbid.runtime;
            const rating = parseFloat(item.imdbid.imdbrating);
            if (!isNaN(rating)) {
                totalImdbRating += rating;
            }
        });
        setTotalWatchlistDuration(parseFloat(totalRuntime.toFixed(1)));
        setAverageRuntime(Number((totalRuntime / items.length).toFixed(1)));
        setAverageImdbRating(Number((totalImdbRating / items.length).toFixed(1)));
    };

    const handleDelete = (item: any) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this movie from your watchlist?");
        if (confirmDelete) {
            fetch(`http://localhost:3000/watchlist/${item.watchlistid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        const newItems = items.filter((i: any) => i.watchlistid !== item.watchlistid);
                        setItems(newItems);
                        calculateAverages(newItems);
                    } else {
                        console.error('Error:', response.statusText);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };
    useEffect(() => {
        fetch('http://localhost:3000/watchlist', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                let totalRuntime = 0;
                let totalImdbRating = 0;
                setItems(data.map((item: any) => {
                    const createdOnDate = new Date(item.createdon).getTime();
                    const diffTime = Math.abs(currentDate.getTime() - createdOnDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    totalRuntime += item.imdbid.runtime;
                    totalImdbRating += parseFloat(item.imdbid.imdbrating);
                    item.daysSince = diffDays;
                    return item;
                }))
                setTotalWatchlistDuration(parseFloat(totalRuntime.toFixed(1)));
                setAverageRuntime(Number((totalRuntime / data.length).toFixed(1)));
                setAverageImdbRating(Number((totalImdbRating / data.length).toFixed(1)));
            })
            .catch(error => console.error('Error:', error));
    }, []);
    return (
        <>
            <div className="my-8"></div>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={500}
                containerClass="carousel-container movie-carousel"
                removeArrowOnDeviceType={["tablet"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-30-px"
            >
                {items.map((item: any) => (
    <div key={item.imdbid.title} className="movie-card flex flex-col items-center justify-center">
        <img src={item.imdbid.poster} alt={item.imdbid.title} />
        <button onClick={() => handleDelete(item)} className="badge badge-error gap-2 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            remove
        </button>
        <h3 className="text-center font-bold">{item.imdbid.title}</h3>
        <div className="badge badge-neutral">IMDB:{item.imdbid.imdbrating}</div>
        <div className="badge badge-ghost">Watchlisted Since: {item.daysSince} Day(s)</div>
    </div>
))}
            </Carousel>

            <div className="my-8"></div>


            <div className="flex flex-col items-center bg-gray-100">
                <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
                    <div>
                        <h2 className="text-xl font-normal text-gray-900">Total Watchlist duration: <span className="font-normal text-blue-600">{totalWatchlistDuration} minutes</span> or  <span className="font-normal text-blue-600"> {Number(totalWatchlistDuration / 60).toFixed(1)} hours </span></h2>
                        <h2 className="text-xl font-normal text-gray-900">It will take your ≈ <span className="font-normal text-blue-600">{Number(totalWatchlistDuration / (60 * 24)).toFixed(1)} days</span> to watch it all!</h2>
                    </div>
                </div>
            </div>


            <div className="my-8"></div>

            <div className="flex flex-col items-center bg-gray-100">
                <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
                    <div>
                        <h2 className="text-xl font-normal text-gray-900">Average Runtime of Movies in Watchlist: <span className="font-normal text-blue-600">{averageRuntime} minutes</span></h2>
                        <h2 className="text-xl font-normal text-gray-900">Average Imdb Rating of Movies in Watchlist: <span className="font-normal text-blue-600">{averageImdbRating}</span></h2>
                    </div>
                </div>
            </div>



        </>
    );
};


export default WatchList;