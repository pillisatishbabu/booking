import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'var(--surface-color)',
            color: 'var(--text-secondary)',
            marginTop: 'auto'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} MovieTix. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
