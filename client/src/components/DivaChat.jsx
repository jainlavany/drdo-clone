import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './DivaChat.css';

export default function DivaChat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am DIVA (DRDO Intelligent Virtual Assistant). How can I assist you with the portal today?"
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
          history: messages.slice(1) // Omit the initial welcome greeting from context
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

  return (
    <div className="diva-wrapper">
      {/* Floating Action Button Bubble */}
      <button 
        className={`diva-bubble-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Assistant"
      >
        {isOpen ? (
          <span className="diva-close-icon">✕</span>
        ) : (
          <span className="diva-bot-icon">🤖</span>
        )}
      </button>

      {/* Chat Pane */}
      {isOpen && (
        <div className="diva-chat-box">
          <div className="diva-chat-header">
            <div className="diva-header-info">
              <span className="diva-header-icon">🛡️</span>
              <div>
                <h4>DIVA</h4>
                <small>DRDO Intelligent Assistant</small>
              </div>
            </div>
            <button className="diva-clear-btn" onClick={() => setMessages([
              { sender: 'bot', text: "Chat history cleared. How can I help you?" }
            ])} title="Clear Chat">🔄</button>
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
