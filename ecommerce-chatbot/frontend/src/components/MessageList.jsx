import React from 'react';
import Message from './Message';
import { useChat } from '../context/ChatContext';

const MessageList = () => {
  const { messages } = useChat();

  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default MessageList;
s