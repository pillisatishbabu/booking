import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedItem } from '../redux/movieSlice';
import Loader from '../components/Loader';
import '../styles/movie-details.css';

const MovieDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedItem: movie, loading } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(setSelectedItem(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    if (loading || !movie) return <Loader />;

    const handleBook = () => {
        navigate(`/shows/${id}`);
    };

    return (
        <div className="movie-details-wrapper animate-fade-in">
            {/* Hero Section */}
            <div className="details-hero">
                <img src={movie.image} alt="" className="details-backdrop" />
                <div className="details-hero-overlay"></div>

                <div className="container details-content">
                    {/* Share Button */}
                    <button className="share-btn-floating">
                        <span>🔗</span> Share
                    </button>

                    {/* Poster Overlay */}
                    <div className="details-poster-wrapper">
                        <img src={movie.image} alt={movie.title} className="details-poster" />
                        <button className="trailer-btn">
                            <span>▶</span> Trailers (2)
                        </button>
                        <div className="poster-footer">In cinemas</div>
                    </div>

                    {/* Movie Info */}
                    <div className="details-info-wrapper">
                        {movie.category === 'upcoming' ? (
                            <div className="interest-bar">
                                <div className="interest-text">
                                    <span className="interest-emoji">👍</span>
                                    <div className="interest-details">
                                        <span className="interest-count">{movie.interestCount || '418K+'} are interested</span>
                                        <span className="interest-sub">Ratings & Reviews disabled as per court order</span>
                                    </div>
                                </div>
                                <button className="btn-interest">I'm interested</button>
                            </div>
                        ) : (
                            <div className="rating-bar-details">
                                <div className="rating-pill">
                                    <span className="star">★</span>
                                    <span className="rating-text">{movie.rating}/10</span>
                                    <span className="rating-votes">(124.5K Votes)</span>
                                </div>
                                <button className="rate-now-btn">Rate now</button>
                            </div>
                        )}

                        <div className="details-meta-line">
                            <span>{movie.duration !== "TBA" ? movie.duration : 'Stay tuned'}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                            <span>•</span>
                            <span>UA13+</span>
                            <span>•</span>
                            <span>Releasing Soon</span>
                        </div>

                        <div className="details-tags">
                            <span className="tag">2D</span>
                            <span className="tag">4DX</span>
                            <span className="tag tag-language">Telugu</span>
                        </div>

                        {movie.category !== 'upcoming' && (
                            <button className="btn btn-book-lg" onClick={handleBook}>
                                Book tickets
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="container details-about-section">
                <h2 className="about-title">About the movie</h2>
                <p className="about-text">
                    {movie.description || "A family thriller where a household's hard-won peace is threatened by a high-stakes conflict. Loyalties are tested as festivity gives way to danger."}
                </p>
            </div>
        </div>
    );
};

export default MovieDetails;
