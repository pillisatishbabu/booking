import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmBooking } from '../redux/bookingSlice';
import '../styles/booking.css';

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedSeats, selectedShow } = useSelector((state) => state.booking);
    const { items: movies } = useSelector((state) => state.movies);

    const movie = movies.find(m => m.id === parseInt(selectedShow?.movieId));
    const total = selectedSeats.length * 120;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const handleCardNumberChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 16);
        setFormData({ ...formData, cardNumber: val });
    };

    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (val.length >= 3) {
            val = val.slice(0, 2) + '/' + val.slice(2);
        }
        setFormData({ ...formData, expiry: val });
    };

    const handleCvvChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setFormData({ ...formData, cvv: val });
    };

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
        return <div className="container" style={{ paddingTop: '8rem' }}>Please select seats first.</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="payment-container glass animate-fade-in" style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)'
            }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Payment</h2>

                <div className="booking-summary-lite" style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2.5rem',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Movie</span>
                        <span>{movie?.title}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Showtime</span>
                        <span>{selectedShow.time} | {selectedSeats.length} Seats</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Amount to Pay</span>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>${total}</span>
                    </div>
                </div>

                <form onSubmit={handlePayment}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Card Number</label>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                className="nav-search-input"
                                style={{ padding: '14px' }}
                                value={formData.cardNumber}
                                onChange={handleCardNumberChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Expiry (MM/YY)</label>
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="nav-search-input"
                                    style={{ padding: '14px' }}
                                    value={formData.expiry}
                                    onChange={handleExpiryChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>CVV</label>
                                <input
                                    type="password"
                                    placeholder="123"
                                    className="nav-search-input"
                                    style={{ padding: '14px' }}
                                    value={formData.cvv}
                                    onChange={handleCvvChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Card Holder Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="nav-search-input"
                                style={{ padding: '14px' }}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary proceed-btn ${loading ? 'disabled' : ''}`}
                        style={{ marginTop: '3rem', height: '56px' }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Confirm Payment of $${total}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
