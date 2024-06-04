import React, { useEffect, useState } from 'react';

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


        fetchMovieDetails(props.movie.Title)
            .then((movie: MovieDetail) => setMovieData(movie));
    }, [accessToken, props.movie.Title]);
    

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
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
          </div>
        </div>
      );
};

export default MovieDetailCard;