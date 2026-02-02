import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../styles/ai-assistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: 'Hello! I am your TICKETnow assistant. Looking for movie recommendations or need help with a booking?' }
    ]);
    const [inputText, setInputText] = useState('');
    const { user } = useSelector(state => state.auth);
    const messagesEndRef = useRef(null);

    // Draggable Logic
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMessage = { id: Date.now(), type: 'user', text: inputText };
        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');

        // Mock AI thinking
        setTimeout(() => {
            let aiText = "That's a great question! I'm currently in 'Cinema Mode'. How else can I help you today?";

            const lowerText = inputText.toLowerCase();
            if (lowerText.includes('movie') || lowerText.includes('recommend')) {
                aiText = "Based on trending movies, I recommend checking out 'Kalki 2898 AD' or 'Salaar'. Would you like me to show you more details?";
            } else if (lowerText.includes('booking') || lowerText.includes('ticket')) {
                aiText = "Booking is easy! Just select a movie you like, choose a showtime, and pick your favorite seats. Let me know if you get stuck!";
            } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                aiText = `Hi ${user ? user.username : 'there'}! I'm here to make your movie-going experience amazing. What's on your mind?`;
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: aiText }]);
        }, 1000);
    };

    return (
        <div
            className={`ai-assistant-container ${isDragging ? 'dragging' : ''}`}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            {isOpen && (
                <div className="assistant-window glass">
                    <div className="assistant-header" onMouseDown={handleMouseDown}>
                        <div className="assistant-avatar-small">✨</div>
                        <div className="assistant-header-info">
                            <h4>TICKETnow AI</h4>
                            <span><div className="online-dot"></div> Always Active</span>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            className="assistant-input"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-btn" onClick={handleSend}>
                            <i>✈</i>
                        </button>
                    </div>
                </div>
            )}

            <button
                className="assistant-bubble"
                onClick={() => !isDragging && setIsOpen(!isOpen)}
                onMouseDown={handleMouseDown}
            >
                {!isOpen && <div className="pulse-ring"></div>}
                <i>{isOpen ? '✕' : '✨'}</i>
            </button>
        </div>
    );
};

export default AIAssistant;
