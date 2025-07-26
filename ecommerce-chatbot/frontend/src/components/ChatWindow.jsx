import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistoryPanel from './ConversationHistoryPanel';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
  const { loading } = useChat();

  return (
    <div className="chat-container">
      <ConversationHistoryPanel />
      <div className="chat-window">
        <MessageList />
        {loading && <p className="loading">AI is typing...</p>}
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;
