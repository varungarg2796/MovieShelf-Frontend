import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.css';
import WatchHistoryRating from '../components/WatchHistoryRating';
import type { WatchHistoryType } from '../types/WatchHistory.types';

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




const WatchHistory = () => {
    const [items, setItems] = useState([]);
    const accessToken = Cookies.get('access_token');
    const [selectedItem, setSelectedItem] = useState<WatchHistoryType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetch('http://localhost:3000/watch-history', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("initial",data)
                console.log("initial",selectedItem)
                setItems(data);
                
                console.log(data)
                console.log(selectedItem)
            })
            .catch(error => console.error('Error:', error));
    }, [refreshKey]);

    useEffect(() => {
        const updatedSelectedItem = items.find((item:WatchHistoryType) => item.watch_history_id === selectedItem?.watch_history_id);
                if (updatedSelectedItem) {
                    console.log("here")
                    setSelectedItem(updatedSelectedItem);
                }
    }, [items]); // Only items here

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
                removeArrowOnDeviceType={[""]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-30-px"
            >
                {items.map((item: WatchHistoryType) => (
                    <div onClick={() => setSelectedItem(item)} key={item.watch_history_id} className="movie-card lg:card-side bg-base-100 shadow-2xl transform hover:scale-105 transition-transform duration-200 ease-in-out p-4 m-4 max-w-2xl mx-auto">
                        <figure className="w-3/3">
                            <img src={item.imdbid.poster} alt={item.imdbid.title} className='self-center' />
                        </figure>
                        <div className="flex justify-center items-center text-center p-2">
                            <span className="badge inline-block">{item.imdbid.title}</span>
                        </div>
                        <p>
                            Watched on <span className="font-semibold ml-1">
                                {item.watch_date
                                    ? new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }).format(new Date(item.watch_date))
                                    : 'N/A'}
                            </span>
                        </p>
                        <p>
                            Your Rating: <span className="font-semibold ml-1">{item.userRating.rating_value || 'N/A'}</span>
                        </p>
                    </div>
                ))}
            </Carousel>


            {selectedItem ? (
                <div className="card lg:card-side bg-base-100 shadow-2xl p-4 m-4 max-w-2xl mx-auto"style={{background: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)'}}>
                    <button onClick={handleEditClick} className="absolute top-2 right-2 focus:outline-none">
                        <i className="fas fa-edit cursor-pointer"></i>
                    </button>
                    <figure className="w-3/3">
                        <img src={selectedItem.imdbid.poster} alt={selectedItem.imdbid.title} className="rounded-lg" />
                    </figure>
                    <div className="card-body w-3/3">
                        <h2 className="card-title text-lg font-bold mb-2">{selectedItem.imdbid.title}</h2>
                        <p className="text-sm mb-1 flex items-center">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            Watched on <span className="font-semibold ml-1">
                                {selectedItem.watch_date
                                    ? new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }).format(new Date(selectedItem.watch_date))
                                    : 'N/A'}
                            </span>
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
            ):(
                <div className="flex justify-center items-center text-lg font-bold p-10">
    Click on a movie to view/write your review
</div>
            )}

            {isModalOpen && (

                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <WatchHistoryRating watchHistory={selectedItem as WatchHistoryType} closeModal={() => setIsModalOpen(false)} refresh={() => setRefreshKey(oldKey => oldKey + 1)} />

                    </div>
                </div>
            )}

        </>

    );
};

export default WatchHistory;