import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.css';

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

interface ImdbInfo {
    imdbid: string;
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: number;
    genre: string;
    director: string;
    writers: string;
    actors: string;
    plot: string;
    languages: string;
    country: string;
    awards: string;
    poster: string;
    metascore: number | null;
    imdbrating: string;
    imdbvotes: number;
    box_office: string;
    production: string;
}

interface UserRating {
    user_rating_id: number;
    rating_value: number | null;
    review: string | null;
    recommended: boolean | null;
    tags: string | null;
}

interface WatchHistory {
    watch_history_id: number;
    user_id: number;
    watch_date: string | null;
    feeling: string | null;
    watched_with: string | null;
    location: string | null;
    platform: string | null;
    rewatched: boolean | null;
    notes: string | null;
    userRating: UserRating;
    imdbid: ImdbInfo;
}



const WatchHistory = () => {
    const [items, setItems] = useState([]);
    const accessToken = Cookies.get('access_token');
    const [selectedItem, setSelectedItem] = useState<WatchHistory | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/watch-history', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setItems(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false}
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
            {items.map((item: WatchHistory) => (
                <div onClick={() => setSelectedItem(item)} key={item.watch_history_id} className="movie-card">
                    <img src={item.imdbid.poster} alt={item.imdbid.title} />
                    <h4>{item.imdbid.title}</h4>
                </div>
            ))}
        </Carousel>

        {selectedItem && (
            <div className="card lg:card-side bg-base-100 shadow-xl p-4 m-4 max-w-2xl mx-auto">        <figure className="w-1/3">
            <img src={selectedItem.imdbid.poster} alt={selectedItem.imdbid.title} className="rounded-lg" />
        </figure>
        <div className="card-body w-2/3">
            <h2 className="card-title text-lg font-bold mb-2">{selectedItem.imdbid.title}</h2>
            <p className="text-sm mb-1 flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                Watched on <span className="font-semibold ml-1">{selectedItem.watch_date || 'N/A'}</span> 
                <span className="ml-1">with <span className="font-semibold">{selectedItem.watched_with || 'N/A'}</span> </span>
                <span className="ml-1">at <span className="font-semibold">{selectedItem.location || 'N/A'}</span>.</span>
            </p>
            <p className="text-sm mb-1 flex items-center">
                <i className="fas fa-smile mr-2"></i>
                Feeling during the watch was <span className="font-semibold ml-1">{selectedItem.feeling || 'N/A'}</span>.
            </p>
            <p className="text-sm mb-1 flex items-center">
                <i className="fas fa-sync-alt mr-2"></i>
                This was {selectedItem.rewatched ? 'a rewatch' : 'the first watch'}.
            </p>
            <p className="text-sm mb-4 flex items-center">
                <i className="fas fa-sticky-note mr-2"></i>
                Notes: <span className="font-semibold ml-1">{selectedItem.notes || 'N/A'}</span>.
            </p>
            <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="text-md font-semibold mb-1">Your Rating</h3>
                <p className="text-sm mb-1 flex items-center">
                    <i className="fas fa-id-badge mr-2"></i>
                    Rating ID: <span className="font-semibold ml-1">{selectedItem.userRating.user_rating_id}</span>.
                </p>
                <p className="text-sm mb-1 flex items-center">
                    <i className="fas fa-star mr-2"></i>
                    Rating Value: <span className="font-semibold ml-1">{selectedItem.userRating.rating_value || 'N/A'}</span>.
                </p>
                <p className="text-sm mb-1 flex items-center">
                    <i className="fas fa-comment mr-2"></i>
                    Review: <span className="font-semibold ml-1">{selectedItem.userRating.review || 'N/A'}</span>.
                </p>
                <p className="text-sm mb-1 flex items-center">
                    <i className="fas fa-thumbs-up mr-2"></i>
                    Recommended: <span className="font-semibold ml-1">{selectedItem.userRating.recommended ? 'Yes' : 'No'}</span>.
                </p>
                <p className="text-sm flex items-center">
                    <i className="fas fa-tags mr-2"></i>
                    Tags: <span className="font-semibold ml-1">{selectedItem.userRating.tags || 'N/A'}</span>.
                </p>
            </div>
        </div>
    </div>
)}



        </>
        
    );
};

export default WatchHistory;