import React, { useState } from 'react';
import '../styles/auth.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Form Data Submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    if (submitted) {
        return (
            <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                <div className="auth-card" style={{ margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
                    <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Message Sent!</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setSubmitted(false)}
                        style={{ width: '100%' }}
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '5rem', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>Contact Us</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    Have questions about a booking or feedback? We'd love to hear from you.
                </p>
            </div>

            <div className="auth-card" style={{ maxWidth: '100%', padding: '3rem' }}>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Help with booking..."
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Message</label>
                        <textarea
                            name="message"
                            placeholder="Tell us more about your inquiry..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{
                                width: '100%',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--color-text-main)',
                                padding: '1rem',
                                outline: 'none',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                transition: 'all 0.3s ease'
                            }}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ height: '55px', marginTop: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                        Send Message
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Email Us</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>support@ticketnow.com</p>
                </div>
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Call Us</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>+91 1800-123-4567</p>
                </div>
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Office</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Hyderabad, Telangana, India</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
