import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectShow } from '../redux/bookingSlice';
import '../styles/booking.css';

const Shows = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: movies, location, theatres } = useSelector((state) => state.movies);
    const movie = movies.find(m => m.id === parseInt(id));

    // Get theatres for current location
    const nearTheatres = theatres[location] || [];

    // Date Logic
    const [selectedDate, setSelectedDate] = React.useState(0);

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                id: i,
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                fullDate: date
            });
        }
        return dates;
    };

    const dates = generateDates();

    // Mock Shows for each theatre
    const getShowsForTheatre = (theatreId) => [
        { id: `${theatreId}-1`, time: '10:00 AM', type: '2D' },
        { id: `${theatreId}-2`, time: '01:15 PM', type: 'IMAX 3D' },
        { id: `${theatreId}-3`, time: '04:30 PM', type: '2D' },
        { id: `${theatreId}-4`, time: '07:45 PM', type: 'Dolby Cinema' },
        { id: `${theatreId}-5`, time: '10:30 PM', type: '2D' },
    ];

    const handleSelectShow = (show, theatreName) => {
        const dateStr = dates[selectedDate].fullDate.toDateString();
        dispatch(selectShow({
            ...show,
            movieId: id,
            movieTitle: movie?.title,
            theatreName: theatreName,
            date: dateStr
        }));
        navigate(`/seats/${id}`);
    };

    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="container booking-container">
            <div className="booking-page-header">
                <h1 className="booking-title">{movie.title}</h1>
                <div className="booking-meta">
                    <span className="meta-tag">{movie.genre}</span>
                    <span className="meta-tag">{movie.duration}</span>
                </div>
            </div>

            {/* Date Selector */}
            <div className="date-selector animate-slide-up">
                {dates.map((item) => (
                    <div
                        key={item.id}
                        className={`date-card ${selectedDate === item.id ? 'active' : ''}`}
                        onClick={() => setSelectedDate(item.id)}
                    >
                        <span className="date-day">{item.day}</span>
                        <span className="date-num">{item.date}</span>
                        <span className="date-month">{item.month}</span>
                    </div>
                ))}
            </div>

            <div className="theatres-list animate-fade-in">
                <h2 className="section-title-small">Nearby Theatres in {location}</h2>

                {nearTheatres.length === 0 ? (
                    <div className="no-theatres">No theatres found for this location.</div>
                ) : (
                    nearTheatres.map((theatre) => (
                        <div key={theatre.id} className="theatre-card glass">
                            <div className="theatre-info">
                                <div className="theatre-main">
                                    <h3 className="theatre-name">
                                        <span className="heart-icon">♡</span> {theatre.name}
                                    </h3>
                                    <div className="theatre-tags">
                                        <span className="theatre-rating">★ {theatre.rating}</span>
                                        {theatre.features.map(f => (
                                            <span key={f} className="feature-tag">{f}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="theatre-distance">
                                    <span className="info-icon">ⓘ</span> Info
                                </div>
                            </div>

                            <div className="theatre-shows">
                                {getShowsForTheatre(theatre.id).map((show) => (
                                    <div key={show.id} className="show-slot-container">
                                        <button
                                            className="show-time-chip"
                                            onClick={() => handleSelectShow(show, theatre.name)}
                                        >
                                            <div className="show-time">{show.time}</div>
                                            <div className="show-tech">{show.type}</div>
                                        </button>
                                        <div className="show-status">Available</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shows;
