import React from 'react';
import { useChat } from '../context/ChatContext';

const ConversationHistoryPanel = () => {
  const { history, loadHistory, saveCurrentToHistory } = useChat();

  return (
    <div className="history-panel">
      <h4>Past Conversations</h4>
      {history.map((_, idx) => (
        <button key={idx} onClick={() => loadHistory(idx)}>
          Conversation {idx + 1}
        </button>
      ))}
      <button onClick={saveCurrentToHistory}>Save Current</button>
    </div>
  );
};

export default ConversationHistoryPanel;
