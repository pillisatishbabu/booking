import React from 'react';
import '../styles/auth.css';

const Wallet = () => {
    return (
        <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '2rem' }}>My Wallet</h2>
            <div className="auth-card" style={{ maxWidth: '100%', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Available Balance</p>
                        <h1 style={{ margin: 0, color: 'var(--color-primary)' }}>₹ 0.00</h1>
                    </div>
                    <button className="btn btn-primary">Add Money</button>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-main)' }}>Recent Transactions</h4>
                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>
                        No transactions yet.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
