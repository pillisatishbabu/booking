import React from 'react';
import '../styles/seats.css';

const Seat = ({ id, status, isSelected, onClick }) => {
    const getClassName = () => {
        if (status === 'occupied') return 'seat occupied';
        if (isSelected) return 'seat selected';
        return 'seat';
    };

    return (
        <div
            className={getClassName()}
            onClick={() => status !== 'occupied' && onClick(id)}
        />
    );
};

export default Seat;
