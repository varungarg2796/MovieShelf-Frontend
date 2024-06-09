import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Cookies from 'js-cookie';

import axios from 'axios';

interface MovieDetail {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[]; // Array of Rating objects
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }
  
  interface Rating {
    Source: string;
    Value: string;
  }

  interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Plot: string;
}

interface MovieDetailCardProps {
    // Define the props for your component here
    movie: Movie;
    closeModal: () => void;
}

const MovieDetailCard: React.FC<MovieDetailCardProps> = (props) => {
    // Implement your component logic here

    const accessToken = Cookies.get('access_token');
    const [movieData, setMovieData] = useState<MovieDetail | null>(null);


    useEffect(() => {
        const fetchMovieDetails = async (title: string) => {
            try {
                const response = await axios.get(`http://localhost:3000/omdb-wrapper/movie?title=${encodeURIComponent(title)}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                return response.data;
            } catch (error) {
                console.error(error);
            }
        }

    const postMovieData = async (movie: MovieDetail) => {
        movie = convertToMovie(movie)
        const response = await fetch('http://localhost:3000/movies', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        });
      
        if (!response.ok) {
          throw new Error('Failed to post movie data');
        }
      };


        fetchMovieDetails(props.movie.Title)
        .then((movie: MovieDetail) => {
          setMovieData(movie);
          // Check for data and accessToken before posting
          if (movie && accessToken) {
            postMovieData(movie);
          }
        });
    }, [accessToken, props.movie.Title]);

    const addToWatchlist = async (imdbId: string) => {
        const response = await fetch('http://localhost:3000/watchlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imdbid: imdbId })
        });
      
        if (response.ok) {
          toast.success('Added to watchlist successfully!');
          props.closeModal();
        } else {
          toast.error('Failed to add to watchlist. Please try again.');
          props.closeModal();
        }
      };

      const markAsWatched = async () => {
        const response = await fetch('http://localhost:3000/watch-history', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                watchHistoryData: {
                    imdbid: movieData?.imdbID,
                }
            })
        }
    
    );
    
    if (response.ok) {
        toast.success('Added to watch history successfully!');
        props.closeModal();
      } else {
        toast.error('Failed to add to watchlist. Please try again.');
        props.closeModal();
      }
    }
    

    return (
        <div onClick={props.closeModal} className="fixed inset-0 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="card  w-96 h-90 bg-base-100 shadow-xl relative">

        <button onClick={props.closeModal} className="btn btn-square absolute top-0 right-0 m-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>    
       
          <figure>
            <img src={movieData?.Poster} alt={movieData?.Title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {movieData?.Title}
              <div className="badge badge-secondary">{movieData?.Year}</div>
            </h2>
            <p>{movieData?.Plot}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-neutral">RunTime: {movieData?.Runtime}</div>
              <div className="badge badge-ghost">I{movieData?.Ratings[0]?.Source}: {movieData?.Ratings[0]?.Value}</div>
              <div className="badge badge-ghost">{movieData?.Ratings[1]?.Source}: {movieData?.Ratings[1]?.Value}</div>
              <div className="badge badge-outline">Genre: {movieData?.Genre}</div> 
              <div className="badge badge-outline">Director: {movieData?.Director}</div>
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={() => addToWatchlist(movieData?.imdbID ?? '')} className="btn btn-active">
                    Add to your Watchlist!
                </button>
                <button onClick={markAsWatched} className="btn btn-success">
                    Mark as Watched!
                </button>
            </div>
          </div>
        </div>
        </div>
      );
};

const convertToMovie = (movieData: MovieDetail): any => ({
    imdbid: movieData.imdbID,
    title: movieData.Title,
    year: parseInt(movieData.Year),
    rated: movieData.Rated,
    released: new Date(movieData.Released),
    runtime: parseInt(movieData.Runtime.split(' ')[0]),
    genre: movieData.Genre,
    director: movieData.Director,
    writers: movieData.Writer,
    actors: movieData.Actors,
    plot: movieData.Plot,
    languages: movieData.Language,
    country: movieData.Country,
    awards: movieData.Awards,
    poster: movieData.Poster,
    metascore: movieData.Metascore === 'N/A' ? null : parseInt(movieData.Metascore),
    imdbrating: parseFloat(movieData.imdbRating),
    imdbvotes: parseInt(movieData.imdbVotes.replace(',', '')),
    box_office: movieData.BoxOffice,
    production: movieData.Production,
  });
  
export default MovieDetailCard;