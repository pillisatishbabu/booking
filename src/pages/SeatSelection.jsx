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
    const { items: movies } = useSelector((state) => state.movies);
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
            <h2 className="seat-header">Select Seats - {movie.title}</h2>
            <p className="seat-sub-header">
                {selectedShow?.time} | {selectedShow?.type}
            </p>

            <div className="screen-container">
                <div className="screen"></div>
            </div>

            <div className="seats-grid">
                {generateSeats()}
            </div>

            <div className="seat-legend">
                <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color selected"></div>
                    <span>Selected</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color occupied"></div>
                    <span>Occupied</span>
                </div>
            </div>

            <div className="booking-summary glass">
                {selectedSeats.length > 0 ? (
                    <>
                        <div className="summary-info">
                            <span className="summary-label">Selected Seats:</span>
                            <span className="summary-value">{selectedSeats.join(', ')}</span>
                        </div>
                        <div className="summary-info">
                            <span className="summary-label">Total Amount:</span>
                            <span className="summary-value price">${selectedSeats.length * TICKET_PRICE}</span>
                        </div>
                    </>
                ) : (
                    <p className="no-seats-msg">No tickets selected. Please pick your seats to proceed.</p>
                )}

                <button
                    className={`btn btn-primary proceed-btn ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                    disabled={selectedSeats.length === 0}
                    onClick={handleProceed}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
