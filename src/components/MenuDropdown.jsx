import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';

const MenuDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="menu-container" ref={dropdownRef}>
            <button className="btn btn-outline menu-trigger" onClick={toggleMenu} title="Menu">
                <span style={{ fontSize: '1.2rem' }}>☰</span>
            </button>

            {isOpen && (
                <div className="menu-dropdown animate-fade-in">
                    <div className="menu-header">
                        <span className="menu-greeting">Options</span>
                    </div>

                    <ul className="menu-list">
                        <li>
                            <Link to="/ai-recommendations" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">✨</span> AI Recommendations
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookings" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">🎟️</span> My Bookings
                            </Link>
                        </li>
                        <li>
                            <Link to="/refund" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">🔄</span> Refund
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallet" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">👛</span> Wallet
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">📞</span> Contact Us
                            </Link>
                        </li>

                        {user && (
                            <>
                                <hr className="menu-divider" />
                                <li>
                                    <Link to="/profile" className="menu-item" onClick={() => setIsOpen(false)}>
                                        <span className="menu-icon">👤</span> Profile Settings
                                    </Link>
                                </li>
                                <li className="menu-item logout-item" onClick={handleLogout}>
                                    <span className="menu-icon">🚪</span> Logout
                                </li>
                            </>
                        )}

                        <hr className="menu-divider" />
                        <li className="menu-item" onClick={toggleTheme}>
                            <span className="menu-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            <div className="theme-toggle-switch">
                                <div className={`switch-knob ${theme === 'dark' ? 'on' : 'off'}`}></div>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MenuDropdown;
