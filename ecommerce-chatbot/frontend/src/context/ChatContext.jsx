import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const sendMessage = (text) => {
    const userMsg = { text, sender: 'user' };
    const aiMsg = { text: 'AI response...', sender: 'ai' };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  const loadHistory = (index) => {
    setMessages(history[index]);
  };

  const saveCurrentToHistory = () => {
    setHistory((prev) => [...prev, [...messages]]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        inputValue,
        setInputValue,
        sendMessage,
        loading,
        history,
        loadHistory,
        saveCurrentToHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
