import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/movies.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="movie-genre">{movie.genre}</span>
                    <span style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>★ {movie.rating}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
