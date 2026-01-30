import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmBooking } from '../redux/bookingSlice';
import '../styles/booking.css';

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedSeats, selectedShow } = useSelector((state) => state.booking);
    const { movies } = useSelector((state) => state.movies);
    const bookings = useSelector((state) => state.booking.bookings); // To check previous bookings if needed

    // In a real app we would get movie from show or store properly
    // Here we might need to rely on what we have or fetch again
    // For simplicity let's assume we can get it or pass it.
    // selectedShow has movieId
    const movie = movies.find(m => m.id === parseInt(selectedShow?.movieId));

    const total = selectedSeats.length * 120; // Mock price

    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            dispatch(confirmBooking({
                movie: movie?.title,
                show: selectedShow,
                seats: selectedSeats,
                total
            }));
            setLoading(false);
            navigate('/bookings');
        }, 1500);
    };

    if (!selectedShow || selectedSeats.length === 0) {
        return <div className="container">Please select seats first.</div>;
    }

    return (
        <div className="container payment-form">
            <h2>Confirm Booking</h2>

            <div className="booking-summary">
                <div className="summary-row">
                    <span>Movie</span>
                    <span>{movie?.title}</span>
                </div>
                <div className="summary-row">
                    <span>Showtime</span>
                    <span>{selectedShow.time} ({selectedShow.type})</span>
                </div>
                <div className="summary-row">
                    <span>Seats</span>
                    <span>{selectedSeats.join(', ')}</span>
                </div>
                <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span>${total}</span>
                </div>
            </div>

            <form onSubmit={handlePayment} style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Payment Details</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="form-control"
                        style={{ width: '100%', padding: '12px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
                        required
                    />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            style={{ flex: 1, padding: '12px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            style={{ flex: 1, padding: '12px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Card Holder Name"
                        style={{ width: '100%', padding: '12px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '2rem', padding: '16px' }}
                    disabled={loading}
                >
                    {loading ? 'Processing Payment...' : `Pay $${total}`}
                </button>
            </form>
        </div>
    );
};

export default Payment;
