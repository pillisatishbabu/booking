import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/upcoming-slider.css';

const UpcomingSlider = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [movies.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
    };

    if (!movies || movies.length === 0) return null;

    const currentMovie = movies[currentIndex];

    return (
        <div className="upcoming-slider-section container">
            <div className="section-header">
                <h2 className="section-title">Coming Soon to Theatres</h2>
                <div className="slider-controls">
                    <button className="slider-nav-btn prev" onClick={prevSlide}>‹</button>
                    <button className="slider-nav-btn next" onClick={nextSlide}>›</button>
                </div>
            </div>

            <div className="slider-viewport">
                <div className="slider-content glass">
                    <div className="slider-image-container">
                        <img
                            src={currentMovie.image}
                            alt={currentMovie.title}
                            className="slider-main-image"
                        />
                        <div className="slider-image-overlay"></div>
                    </div>

                    <div className="slider-info">
                        <div className="upcoming-badge">PREMIERE</div>
                        <h3 className="slider-movie-title">{currentMovie.title}</h3>
                        <p className="slider-movie-description">{currentMovie.description}</p>

                        <div className="slider-movie-meta">
                            <span className="meta-tag">{currentMovie.genre}</span>
                            <span className="meta-tag">{currentMovie.duration}</span>
                        </div>

                        <div className="slider-actions">
                            <button
                                className="btn btn-primary slider-btn"
                                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                            >
                                View Details
                            </button>
                            <button className="btn btn-outline slider-btn-secondary">
                                Watch Trailer
                            </button>
                        </div>
                    </div>
                </div>

                <div className="slider-pagination">
                    {movies.map((_, index) => (
                        <div
                            key={index}
                            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingSlider;
