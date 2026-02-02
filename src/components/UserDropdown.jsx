import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import '../styles/navbar.css';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    if (!user) return null;

    return (
        <div className="menu-container" ref={dropdownRef}>
            <button className="btn btn-outline menu-trigger" onClick={toggleMenu} title="Account">
                <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-primary)' }}>
                    {user.name.charAt(0).toUpperCase()}
                </span>
            </button>

            {isOpen && (
                <div className="menu-dropdown animate-fade-in" style={{ right: 0 }}>
                    <div className="menu-header">
                        <span className="menu-greeting">Account: {user.name}</span>
                    </div>

                    <ul className="menu-list">
                        <li>
                            <Link to="/profile" className="menu-item" onClick={() => setIsOpen(false)}>
                                <span className="menu-icon">👤</span> Profile Settings
                            </Link>
                        </li>
                        <hr className="menu-divider" />
                        <li className="menu-item logout-item" onClick={handleLogout}>
                            <span className="menu-icon">🚪</span> Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
