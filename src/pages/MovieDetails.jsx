import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMovie } from '../redux/movieSlice';
import Loader from '../components/Loader';
import '../styles/movies.css';

const MovieDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedMovie, loading } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(setSelectedMovie(id));
    }, [dispatch, id]);

    if (loading || !selectedMovie) return <Loader />;

    const handleBook = () => {
        navigate(`/shows/${id}`);
    };

    return (
        <div className="container movie-details-container">
            <div>
                <img src={selectedMovie.image} alt={selectedMovie.title} className="movie-banner" />
            </div>
            <div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{selectedMovie.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    <span>{selectedMovie.duration}</span>
                    <span>•</span>
                    <span>{selectedMovie.genre}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--success-color)' }}>★ {selectedMovie.rating}</span>
                </div>

                <p style={{ lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    {selectedMovie.description}
                </p>

                <button className="btn btn-primary" onClick={handleBook} style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                    Book Tickets
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
