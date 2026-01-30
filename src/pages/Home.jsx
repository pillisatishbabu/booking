import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import '../styles/movies.css';

const Home = () => {
    const { movies, loading, error } = useSelector((state) => state.movies);

    if (loading) return <Loader />;
    if (error) return <div className="container" style={{ paddingTop: '2rem' }}>Error: {error}</div>;

    return (
        <div className="container">
            <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }} className="animate-fade-in">Now Showing</h2>
            <div className="movies-grid animate-slide-up">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
