import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const ChatBot: React.FC = () => {
  // Whether the chat window is open
  const [isOpen, setIsOpen] = useState(false);
  // To store the message input from the user
  const [input, setInput] = useState('');
  // Chat history, each with sender type and text
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  // Loading state during API calls
  const [loading, setLoading] = useState(false);

  // Toggle chat window open/close
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send a message to the backend AI and add the response to the history
  const sendMessage = async () => {
    if (!input.trim()) return;
    // Add user's message to history
    const userMessage: ChatMessage = { sender: 'user', text: input };
    setChatHistory((prev) => [...prev, userMessage]);

    // Capture the input for the API call
    const userPrompt = input;
    setInput('');
    setLoading(true);

    try {
      // Adjust the endpoint URL as required
      const response = await fetch('http://localhost:3001/api/koreanGuide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation: userPrompt })
      });
      const data = await response.json();
      const aiMessage: ChatMessage = { sender: 'ai', text: data.guide };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'There was an error processing your request. Please try again later.'
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center bg-indigo-600 text-white p-3 rounded-t-lg">
            <span className="font-bold">Korean Learning Bot</span>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={mb-2 ${msg.sender === 'ai' ? 'text-blue-600' : 'text-gray-800'}}
              >
                <div
                  className={`p-2 rounded ${
                    msg.sender === 'ai' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-gray-500">Generating answer...</p>}
          </div>
          <div className="p-3 border-t border-gray-200">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
          </div>
        </div>
      )}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </>
  );
};

export default ChatBot;