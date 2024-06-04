import React, { useState, useEffect, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import debounce from 'lodash.debounce';
import Cookies from 'js-cookie';
import MovieDetailCard from '../components/MovieDetailCard';

interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Plot: string;
    Year: string;
}

const HomePage: React.FC = () => {
    const user = React.useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const accessToken = Cookies.get('access_token');
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
                console.log(searchDropdownOpen)
            } else {
                setSearchDropdownOpen(false);
                console.log(searchDropdownOpen)

            }
        }, 1500),
        [] // dependencies array
    );

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

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a movie..."
                />
                {searchDropdownOpen && (
  <div className="absolute w-full mt-2">
    <div className="card shadow-lg">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="card-body flex items-center space-x-2 hover:bg-primary hover:text-white cursor-pointer"
          onClick={() => openModal(movie)}
        >
          <h2 className="text-sm font-semibold">{movie.Title}</h2>
          <h2 className="text-sm font-semibold">{movie.Year}</h2>
          <img src={movie.Poster} alt={movie.Title} className="movie-poster w-16 h-16 object-cover" />                                
        </div>
      ))}
    </div>
  </div>
)}
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <MovieDetailCard movie={selectedMovie as Movie} />
                            <div className="modal-action">
                                <button onClick={closeModal} className="btn">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;