import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHeadset } from 'react-icons/fa';
import './DivaChat.css';

export default function DivaChat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [agentLanguage, setAgentLanguage] = useState('en');

  const getWelcomeMessage = (lang) => {
    return lang === 'en'
      ? "Hi ! I am DIVA (DRDO Intelligent Virtual Assistant), how can I help you?"
      : "नमस्ते! मैं दीवा (DRDO इंटेलिजेंट वर्चुअल असिस्टेंट) हूँ, मैं आपकी क्या मदद कर सकती हूँ?";
  };

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getWelcomeMessage('en')
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleAgentLanguage = () => {
    const nextLang = agentLanguage === 'en' ? 'hi' : 'en';
    setAgentLanguage(nextLang);
    setMessages((prev) => {
      // If the chat history only contains the welcome message, swap it to the new language
      if (prev.length === 0) {
        return [{ sender: 'bot', text: getWelcomeMessage(nextLang) }];
      }
      if (prev.length === 1 && prev[0].sender === 'bot') {
        if (prev[0].text === getWelcomeMessage('en') || prev[0].text === getWelcomeMessage('hi')) {
          return [{ sender: 'bot', text: getWelcomeMessage(nextLang) }];
        }
      }
      return prev;
    });
  };

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
          history: messages,
          language: agentLanguage
        })
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server returned an invalid non-JSON response');
      }

      if (!res.ok) {
        throw new Error(data?.error || `Server error (Status ${res.status})`);
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
    } catch (err) {
      console.error('DIVA error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Error: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ sender: 'bot', text: getWelcomeMessage(agentLanguage) }]);
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
          <FaHeadset className="diva-launcher-icon" />
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
              {/* Language Toggle Button */}
              <button
                className="diva-action-btn diva-lang-toggle"
                onClick={toggleAgentLanguage}
                title={agentLanguage === 'en' ? "Switch response language to Hindi" : "Switch response language to English"}
              >
                🌐 {agentLanguage.toUpperCase()}
              </button>
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
