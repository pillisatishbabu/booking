import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSeat } from '../redux/bookingSlice';
import Seat from '../components/Seat';
import '../styles/seats.css';

const ROWS = 8;
const COLS = 12;
const TICKET_PRICE = 120; // Mock price

const SeatSelection = () => {
    const { id } = useParams(); // movieId
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedSeats, selectedShow } = useSelector((state) => state.booking);
    const { movies } = useSelector((state) => state.movies);
    const movie = movies.find(m => m.id === parseInt(id));

    useEffect(() => {
        if (!selectedShow) {
            navigate(`/shows/${id}`);
        }
    }, [selectedShow, id, navigate]);

    const handleSeatClick = (seatId) => {
        dispatch(toggleSeat(seatId));
    };

    const handleProceed = () => {
        if (selectedSeats.length > 0) {
            navigate('/payment');
        }
    };

    const generateSeats = () => {
        const seats = [];
        for (let i = 0; i < ROWS; i++) {
            const rowSeats = [];
            for (let j = 0; j < COLS; j++) {
                const seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
                // Mock random occupied seats
                const isOccupied = (i * j + i) % 7 === 0 || (i === 3 && j === 4);

                rowSeats.push(
                    <Seat
                        key={seatId}
                        id={seatId}
                        status={isOccupied ? 'occupied' : 'available'}
                        isSelected={selectedSeats.includes(seatId)}
                        onClick={handleSeatClick}
                    />
                );
            }
            seats.push(<div key={i} className="seat-row">{rowSeats}</div>);
        }
        return seats;
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container seat-map-container">
            <h2>Select Seats - {movie.title}</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                {selectedShow?.time} | {selectedShow?.type}
            </p>

            <div className="screen"></div>

            <div className="seats-grid">
                {generateSeats()}
            </div>

            <div className="seat-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--success-color)' }}></div>
                    <span>Selected</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--border-color)' }}></div>
                    <span>Occupied</span>
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>
                    Total: ${selectedSeats.length * TICKET_PRICE}
                </h3>
                <button
                    className="btn btn-primary"
                    disabled={selectedSeats.length === 0}
                    onClick={handleProceed}
                    style={{ opacity: selectedSeats.length === 0 ? 0.5 : 1 }}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
