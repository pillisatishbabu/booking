import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="container hero-content animate-slide-up">
                <div className="hero-badge">Now Trending</div>
                <h1 className="hero-title">Experience Cinema Like never Before</h1>
                <p className="hero-description">
                    Book tickets for the latest blockbusters, explore exclusive premieres,
                    and enjoy a premium movie-going experience with TICKETnow.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary btn-large" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                        Explore Movies
                    </button>
                    <button className="btn btn-outline btn-large" onClick={() => navigate('/ai-recommendations')}>
                        AI Recommendations
                    </button>
                </div>
            </div>

            {/* Minimalist Hero Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
