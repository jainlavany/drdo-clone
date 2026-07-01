import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './DivaChat.css';

export default function DivaChat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I am DIVA (DRDO Intelligent Virtual Assistant), how can I help you?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const baseUrl = window.SERVER_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages // Pass the current history
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.error }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
      }
    } catch (err) {
      console.error('DIVA error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I am unable to connect to the assistant server at the moment.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="diva-wrapper">
      {/* Floating Action Button Bubble: Girl with headset & mic SVG */}
      <button 
        className={`diva-bubble-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setIsMaximized(false); // Reset maximized state on close
        }}
        aria-label="Toggle Assistant"
      >
        {isOpen ? (
          <span className="diva-close-icon">✕</span>
        ) : (
          <svg className="diva-headset-girl-svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Hair / Head outline */}
            <path d="M12 2C7.58 2 4 5.58 4 10c0 2.22.9 4.22 2.37 5.67" />
            <path d="M17.63 15.67C19.1 14.22 20 12.22 20 10c0-4.42-3.58-8-8-8z" />
            <path d="M9 11a3 3 0 0 0 6 0" />
            {/* Headphones */}
            <rect x="2" y="9" width="3" height="4" rx="1.5" fill="currentColor" />
            <rect x="19" y="9" width="3" height="4" rx="1.5" fill="currentColor" />
            <path d="M4 9a8 8 0 0 1 16 0" />
            {/* Mic */}
            <path d="M19 13v2a3 3 0 0 1-3 3h-2" />
            <circle cx="13" cy="18" r="1" fill="currentColor" />
            {/* Shoulders */}
            <path d="M6 21v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" />
          </svg>
        )}
      </button>

      {/* Chat Pane */}
      {isOpen && (
        <div className={`diva-chat-box ${isMaximized ? 'maximized' : ''}`}>
          <div className="diva-chat-header">
            <div className="diva-header-info">
              {/* Uses the robot emoji 🤖 in the header as requested */}
              <span className="diva-header-icon">🤖</span>
              <div>
                <h4>DIVA</h4>
                <small>DRDO Intelligent Virtual Assistant</small>
              </div>
            </div>
            <div className="diva-header-actions">
              {/* Maximize / Minimize toggle */}
              <button 
                className="diva-action-btn" 
                onClick={() => setIsMaximized(!isMaximized)} 
                title={isMaximized ? "Minimize Window" : "Maximize Window"}
              >
                {isMaximized ? '🗗' : '⛶'}
              </button>
              {/* Clear chat history button */}
              <button 
                className="diva-action-btn" 
                onClick={handleClear} 
                title="Clear Chat History"
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="diva-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`diva-msg-row ${m.sender}`}>
                <div className="diva-msg-bubble">
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="diva-msg-row bot">
                <div className="diva-msg-bubble typing">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="diva-chat-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
