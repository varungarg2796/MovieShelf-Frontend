import React, { useState, useEffect, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import debounce from 'lodash.debounce';
import Cookies from 'js-cookie';
import MovieDetailCard from '../components/MovieDetailCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Plot: string;
    Year: string;
}
interface MovieResponse {
    title: string;
    poster: string;
    year: string;
}

const HomePage: React.FC = () => {
    const user = React.useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<MovieResponse[]>([]);
    const accessToken = Cookies.get('access_token');
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    function openModal(movie: Movie) {
        setSelectedMovie(movie);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const searchMovies = useCallback(
        debounce(async (searchTerm: string) => {
            const response = await fetch(`http://localhost:3000/omdb-wrapper/movie?search=${searchTerm}&page=1`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setMovies(data.Search);
            if (data.Search && data.Search.length > 0) {
                setSearchDropdownOpen(true);
            } else {
                setSearchDropdownOpen(false);
            }
        }, 1500),
        [] // dependencies array
    );
    const fetchPopularMovies = async () => {
        try {
            const response = await fetch(`http://localhost:3000/movies`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            const data = await response.json();
            console.log(data)
            setPopularMovies(data);
        } catch (error) {
            console.error(error);
            // Handle the error appropriately here, e.g., set an error state, show a notification, etc.
        }
    };
    useEffect(() => {
        return () => {
            searchMovies.cancel();
        };
    }, [searchMovies]);

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    }, [searchTerm, searchMovies]);

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <p className="text-lg mb-4">
                    Start your movie journal with Movie Shelf!
                </p>
                <div className="mb-8">
                    <input
                        type="text"
                        className="input input-bordered w-full px-4 py-2 rounded-lg shadow focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a movie..."
                    />
                    {searchDropdownOpen && (
                        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
                            {movies.map((movie, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-2 hover:bg-primary hover:text-white cursor-pointer rounded-lg transition-colors"
                                    onClick={() => openModal(movie)}
                                >
                                    <img src={movie.Poster} alt={movie.Title} className="w-12 h-12 object-cover rounded-md" />
                                    <div className="ml-4">
                                        <h2 className="text-sm font-semibold">{movie.Title} ({movie.Year})</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={false} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={[]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {popularMovies?.map((movie, index) => (
                        <div key={index} className="p-2">
                            <img src={movie.poster} alt={movie.title} className="w-full h-auto rounded-md" />
                            <h3 className="text-center mt-2">{movie.title}</h3>
                            <h3 className="text-center mt-2">{movie.year}</h3>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="stats stats-vertical lg:stats-horizontal shadow">
  
  <div className="stat">
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  

  <div className="stat">
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat">
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat">
    <div className="stat-title">New Registers</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>

            {modalIsOpen && selectedMovie && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle" onClick={closeModal}>✕</button>
                        <MovieDetailCard movie={selectedMovie} closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
