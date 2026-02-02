import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Hero from '../components/Hero';
import UpcomingSlider from '../components/UpcomingSlider';
import '../styles/movies.css';

const Home = () => {
    const { items, searchQuery, loading, error } = useSelector((state) => state.movies);

    // Sections
    const filteredItems = items.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const nowShowing = filteredItems.filter(m => m.type === 'movie' && m.category === 'now-showing');
    const upcoming = filteredItems.filter(m => m.type === 'movie' && m.category === 'upcoming');

    if (loading) return <Loader />;
    if (error) return <div className="container" style={{ paddingTop: '2rem', color: 'var(--color-accent)' }}>Error: {error}</div>;

    const MovieSection = ({ title, movies }) => (
        <div className="category-section animate-fade-in">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <button className="see-all-btn">See All ›</button>
            </div>
            <div className="movies-grid">
                {movies.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="home-container">
            {searchQuery ? (
                <div className="container">
                    <h2 className="search-results-title">Search Results</h2>
                    {filteredItems.length === 0 ? (
                        <div className="no-results">No movies found</div>
                    ) : (
                        <div className="movies-grid">
                            {filteredItems.map(item => <MovieCard key={item.id} movie={item} />)}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Hero />
                    {upcoming.length > 0 && <UpcomingSlider movies={upcoming.slice(0, 4)} />}
                    <div className="container sections-wrapper" style={{ paddingBottom: '4rem' }}>
                        {nowShowing.length > 0 && <MovieSection title="Recommended Movies" movies={nowShowing} />}
                        {upcoming.length > 4 && <MovieSection title="More Upcoming Movies" movies={upcoming.slice(4)} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
