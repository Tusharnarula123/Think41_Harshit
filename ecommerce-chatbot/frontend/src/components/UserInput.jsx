import React from 'react';
import { useChat } from '../context/ChatContext';

const UserInput = () => {
  const { inputValue, setInputValue, sendMessage } = useChat();

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="user-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default UserInput;
