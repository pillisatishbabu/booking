import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/movies.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="movie-card glass" onClick={handleClick}>
            <div className="poster-container">
                <img src={movie.image} alt={movie.title} className="movie-poster" />
                <div className="rating-badge">
                    <span className="star">★</span>
                    <span className="rating-value">{movie.rating}</span>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
                <div className="movie-meta">
                    <span className="movie-genre">{movie.genre}</span>
                    <span className="movie-type">{movie.language || 'English'}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
