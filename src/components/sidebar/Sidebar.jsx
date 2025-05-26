import React, { useState, useContext } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, setShowResult, setResponse, setRecentPrompt } = useContext(Context);
  
  const [recentChats] = useState([
    "What is React and how does it work?",
    "Explain machine learning basics",
    "Best practices for JavaScript",
    "How to improve code performance?",
    "CSS Grid vs Flexbox comparison"
  ]);

  const startNewChat = () => {
    setShowResult(false);
    setResponse("");
    setRecentPrompt("");
  };

  const loadRecentChat = (chatText) => {
    onSent(chatText);
  };

  const menuItems = [
    {
      icon: assets.question,
      text: "Help",
      action: () => onSent("How can you help me? What are your capabilities?")
    },
    {
      icon: assets.restore,
      text: "Activity",
      action: () => console.log("Activity clicked")
    },
    {
      icon: assets.setting,
      text: "Settings",
      action: () => console.log("Settings clicked")
    }
  ];

  return (
    <div className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
      {/* Top Section */}
      <div className="sidebar-top">
        <div className="menu-toggle">
          <img
            src={assets.menubar}
            alt="Menu"
            onClick={() => setExtended(!extended)}
            className="menu-icon"
          />
        </div>
        
        <div className="new-chat-btn" onClick={startNewChat}>
          <div className="new-chat-icon">
            <img src={assets.newChat} alt="New Chat" />
          </div>
          {extended && (
            <span className="new-chat-text">New Chat</span>
          )}
        </div>
        
        {extended && (
          <div className="recent-section">
            <h3 className="section-title">Recent</h3>
            <div className="recent-list">
              {recentChats.map((chat, index) => (
                <div 
                  key={index}
                  className="recent-item"
                  onClick={() => loadRecentChat(chat)}
                >
                  <div className="recent-icon">
                    <img src={assets.messageicon} alt="Message" />
                  </div>
                  <p className="recent-text" title={chat}>
                    {chat.length > 25 ? `${chat.substring(0, 25)}...` : chat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className="bottom-item"
            onClick={item.action}
          >
            <div className="bottom-icon">
              <img src={item.icon} alt={item.text} />
            </div>
            {extended && (
              <span className="bottom-text">{item.text}</span>
            )}
          </div>
        ))}
        
        {extended && (
          <div className="sidebar-footer">
            <div className="version-info">
              <p>Sweet AI v1.0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;