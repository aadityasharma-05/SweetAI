import React, { useContext, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, response, loading, input, setInput, recentprompt, showResult } = useContext(Context);
  const resultRef = useRef(null);

  // Auto scroll to bottom when new response comes
  useEffect(() => {
    if (resultRef.current && response) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [response]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSent(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatResponse = (text) => {
    if (!text) return '';
    
    // Convert markdown-like formatting to HTML
    let formatted = text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      // Lists
      .replace(/^\s*[-•]\s+(.+)$/gm, '<li>$1</li>')
      // Wrap in paragraphs
      .replace(/^(.+)$/gm, '<p>$1</p>')
      // Clean up multiple paragraphs
      .replace(/<\/p>\s*<p>/g, '</p><p>')
      // Wrap lists
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    return formatted;
  };

  const predefinedPrompts = [
    {
      text: "Additya sharma",
      icon: assets.roadtrip,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      text: "Briefly summarize this concept: industrialization",
      icon: assets.industry,
      gradient: "from-green-500 to-teal-600"
    },
    {
      text: "Best team in Football: BARCELONA",
      icon: assets.barcelona,
      gradient: "from-red-500 to-pink-600"
    },
    {
      text: "Improve my code and make it readable",
      icon: assets.code,
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <div className='main'>
      <div className="nav">
        <div className="nav-title">
          <h1>Sweet AI</h1>
          <span className="nav-subtitle">Your intelligent assistant</span>
        </div>
        <div className="nav-user">
          <img src={assets.usericon} alt="User" />
        </div>
      </div>
      
      <div className="main-container">
        {!showResult ? (
          <div className="welcome-section">
            <div className="greet">
              <h2><span className="gradient-text">Hello, there!</span></h2>
              <p className="greet-subtitle">How can I help you today?</p>
            </div>
            
            <div className="cards">
              {predefinedPrompts.map((prompt, index) => (
                <div 
                  key={index}
                  className={`card bg-gradient-to-br ${prompt.gradient}`}
                  onClick={() => onSent(prompt.text)}
                >
                  <div className="card-content">
                    <p>{prompt.text}</p>
                    <div className="card-icon">
                      <img src={prompt.icon} alt="Card Icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='result-section' ref={resultRef}>
            <div className="conversation">
              <div className="message user-message">
                <div className="message-avatar">
                  <img src={assets.usericon} alt="User" />
                </div>
                <div className="message-content">
                  <p>{recentprompt}</p>
                </div>
              </div>
              
              <div className="message ai-message">
                <div className="message-avatar ai-avatar">
                  <div className="ai-icon">🤖</div>
                </div>
                <div className="message-content">
                  {loading ? (
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p>Sweet is thinking...</p>
                    </div>
                  ) : (
                    <div 
                      className="response-text"
                      dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="main-bottom">
          <div className="search-container">
            <div className="search-box">
              <div className="search-input-container">
                <div className="input-actions-left">
                  <img src={assets.gallary} alt="Gallery" className="action-icon" />
                </div>
                <textarea
                  placeholder="Enter your prompt here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  rows="1"
                  className="search-input"
                />
                <div className="input-actions-right">
                  <img src={assets.microphone} alt="Microphone" className="action-icon" />
                  <button 
                    onClick={handleSend} 
                    disabled={loading || !input.trim()}
                    className="send-button"
                  >
                    <img src={assets.send} alt="Send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bottom-info">
            <p>Sweet may display inaccurate info, including about people, so double-check its responses. 
            <span className="privacy-link">Your privacy and Sweet app</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;