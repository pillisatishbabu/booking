import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/booking.css';

const Bookings = () => {
    const { bookings } = useSelector((state) => state.booking);

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>My Bookings</h2>

            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No bookings found.</p>
                    <Link to="/" className="btn btn-primary">Book a Movie</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-summary" style={{ marginTop: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: 'var(--primary-color)' }}>{booking.movie}</h3>
                                <span style={{ color: 'var(--text-secondary)' }}>ID: {booking.id}</span>
                            </div>

                            <div className="summary-row">
                                <span>Date & Time</span>
                                <span>{booking.show.time}</span>
                            </div>
                            <div className="summary-row">
                                <span>Seats</span>
                                <span>{booking.seats.join(', ')}</span>
                            </div>
                            <div className="summary-row">
                                <span>Amount Paid</span>
                                <span>${booking.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;
