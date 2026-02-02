import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/booking.css';

const Bookings = () => {
    const { bookings } = useSelector((state) => state.booking);

    return (
        <div className="container booking-container">
            <h2 className="booking-header">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="empty-bookings">
                    <p>No bookings found.</p>
                    <Link to="/" className="btn btn-primary">Book a Movie</Link>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header-row">
                                <h3 className="booking-movie-title">{booking.movie}</h3>
                                <span className="booking-id">ID: {booking.id}</span>
                            </div>

                            <div className="summary-row">
                                <span>Show Info</span>
                                <span>{booking.show.time} • {booking.show.theatreName}</span>
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
