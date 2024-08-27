import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatWindowProps {
  workspaceId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ workspaceId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [workspaceId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/workspaces/${workspaceId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post(`/workspaces/${workspaceId}/messages`, {
          content: input,
          sender: 'user',
        });
        setMessages(prev => [...prev, response.data]);
        setInput('');
        // Fetch the AI response
        await fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
            }`}>
              {message.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow input rounded-r-none"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          className="btn btn-primary rounded-l-none"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;