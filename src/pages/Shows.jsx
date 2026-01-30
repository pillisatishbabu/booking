import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectShow } from '../redux/bookingSlice';
import '../styles/booking.css';

const Shows = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movies);
    const movie = movies.find(m => m.id === parseInt(id));

    // Mock Shows
    const shows = [
        { id: 1, time: '10:00 AM', type: '2D' },
        { id: 2, time: '01:00 PM', type: 'IMAX 3D' },
        { id: 3, time: '04:00 PM', type: '2D' },
        { id: 4, time: '07:00 PM', type: 'Dolby Cinema' },
        { id: 5, time: '10:00 PM', type: '2D' },
    ];

    const handleSelectShow = (show) => {
        dispatch(selectShow({ ...show, movieId: id, movieTitle: movie?.title }));
        navigate(`/seats/${id}`);
    };

    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Select Show Time - {movie.title}</h2>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {shows.map((show) => (
                    <button
                        key={show.id}
                        className="btn btn-outline"
                        style={{ minWidth: '150px', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}
                        onClick={() => handleSelectShow(show)}
                    >
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{show.time}</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{show.type}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Shows;
