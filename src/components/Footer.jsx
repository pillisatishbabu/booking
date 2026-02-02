import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            setIsVisible(scrollPercent > 0.95 || window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className={`footer ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="container footer-row animate-fade-in">
                <div className="footer-left">
                    <div className="footer-brand-mini">
                        <span className="logo-main" style={{ color: '#fff' }}>TICKET</span>
                        <span className="logo-accent">now</span>
                    </div>
                    <p className="copyright">&copy; {new Date().getFullYear()} TICKETnow. All rights reserved.</p>
                </div>

                <div className="footer-right">
                    <div className="social-links-minimal">
                        <span className="social-icon-min">f</span>
                        <span className="social-icon-min">𝕏</span>
                        <span className="social-icon-min">📸</span>
                    </div>
                    <div className="footer-support-links">
                        <Link to="/contact">Support</Link>
                        <Link to="/refund">Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
