import React from 'react';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            color: 'var(--primary-color)'
        }}>
            <div className="loader">Loading...</div>
            {/* You can add a spinner CSS animation here later */}
        </div>
    );
};

export default Loader;
