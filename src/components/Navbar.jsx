import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setLocation } from '../redux/movieSlice';
import '../styles/navbar.css';
import MenuDropdown from './MenuDropdown';
import UserDropdown from './UserDropdown';

const CITIES = [
    'Hyderabad', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Pune', 'Kochi', 'Jaipur'
];

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const { searchQuery, location } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = React.useState(false);
    const [showLocationModal, setShowLocationModal] = React.useState(false);
    const locationRef = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleClickOutside = (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setShowLocationModal(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleLocationSelect = (city) => {
        dispatch(setLocation(city));
        setShowLocationModal(false);
    };

    return (
        <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="nav-left">
                    <Link to="/" className="logo-container">
                        <span className="logo-main">TICKET</span>
                        <span className="logo-accent">now</span>
                    </Link>

                    <div className="search-bar-container">
                        <i className="search-icon">🔍</i>
                        <input
                            type="text"
                            placeholder="Search for Movies, Plays, Sports and Activities"
                            className="nav-search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="nav-right">
                    <div className="location-container" ref={locationRef}>
                        <div
                            className="location-selector"
                            onClick={() => setShowLocationModal(!showLocationModal)}
                        >
                            <span>{location}</span>
                            <i className={`dropdown-arrow ${showLocationModal ? 'up' : ''}`}>▾</i>
                        </div>

                        {showLocationModal && (
                            <div className="location-dropdown animate-fade-in">
                                <div className="dropdown-header">Popular Cities</div>
                                <div className="city-grid">
                                    {CITIES.map(city => (
                                        <button
                                            key={city}
                                            className={`city-item ${location === city ? 'active' : ''}`}
                                            onClick={() => handleLocationSelect(city)}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="nav-actions">
                        {user ? (
                            <UserDropdown />
                        ) : (
                            <Link to="/login" className="btn btn-signin">Sign in</Link>
                        )}
                        <MenuDropdown />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
