import React from 'react';
import './Message.css';

const Message = ({ text, sender }) => (
  <div className={`message ${sender}`}>
    <p>{text}</p>
  </div>
);

export default Message;
