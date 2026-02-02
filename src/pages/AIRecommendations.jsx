import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import '../styles/movies.css';

const AIRecommendations = () => {
    const { items, loading } = useSelector((state) => state.movies);

    // Mock AI Logic: Select random movies as recommendations (using a stable seed for demo)
    const recommendedMovies = items.slice(0, 4);

    if (loading) return <div className="loader">Analyzing your preferences...</div>;

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="animate-fade-in">
                <div className="section-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div className="hero-badge" style={{ marginBottom: 0 }}>AI Selection</div>
                    <h2 className="section-title" style={{ fontSize: '2.5rem' }}>✨ Handpicked for You</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px', fontSize: '1.1rem' }}>
                        Our neural engine has analyzed your taste to find these cinematic gems you'll absolutely love.
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="no-results glass" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
                        Tailoring your experience... Please wait.
                    </div>
                ) : (
                    <div className="movies-grid">
                        {recommendedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>

            <div className="glass" style={{
                marginTop: '4rem',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-primary-glow)',
                backgroundColor: 'rgba(139, 92, 246, 0.05)'
            }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Why these movies?</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    Our AI models consider genre affinity, director styles, and community ratings to predict what will resonate with you.
                    The more you book, the smarter we get.
                </p>
            </div>
        </div>
    );
};

export default AIRecommendations;
