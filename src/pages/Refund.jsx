import React from 'react';
import '../styles/auth.css'; // Reusing some card styles

const Refund = () => {
    return (
        <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '2rem' }}>Refund Requests</h2>
            <div className="auth-card" style={{ maxWidth: '100%', padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💸</div>
                <h3 style={{ color: 'var(--color-text-main)' }}>No Recent Bookings for Refund</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    You can only request a refund for bookings made within the last 24 hours and at least 4 hours before the showtime.
                </p>
                <button className="btn btn-primary">Check Eligibility</button>
            </div>
        </div>
    );
};

export default Refund;
