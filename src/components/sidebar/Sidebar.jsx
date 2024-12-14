import React, { useState } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}> {/* Sidebar will have 'extended' class if state is true */}
      {/* Top Section */}
      <div className="top">
        <img
          src={assets.menubar}
          alt="Menu Icon"
          onClick={() => setExtended(!extended)} // Toggle the extended state on click
        />
        <div className="new-chat">
          <img src={assets.newChat} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.messageicon} alt="Message Icon" />
              <p>What is React...</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item">
          <img src={assets.restore} alt="Restore Icon" />
          {extended ? <p>Restore</p> : null}
        </div>
        <div className="bottom-item">
          <img src={assets.setting} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
