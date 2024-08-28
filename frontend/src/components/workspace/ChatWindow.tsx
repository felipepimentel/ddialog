import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Paperclip, Mic, User, Bot } from 'lucide-react';
import api from '../../services/api';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ChatWindowProps {
  workspaceId: number | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ workspaceId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (workspaceId) {
      fetchMessages();
    }
  }, [workspaceId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/workspaces/${workspaceId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !workspaceId) return;

    try {
      const response = await api.post(`/workspaces/${workspaceId}/messages`, {
        content: inputMessage,
        sender: 'user'
      });
      setMessages([...messages, response.data]);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  if (!workspaceId) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Select a workspace to start chatting</p>
        <p className="text-gray-500 dark:text-gray-400">Choose a workspace from the left sidebar or create a new one</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Workspace Chat</h2>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-4 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                message.sender === 'user'
                  ? 'bg-blue-100 dark:bg-blue-800 ml-auto'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 mr-2" />
                ) : (
                  <Bot className="h-4 w-4 mr-2" />
                )}
                <small className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
              <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2 items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow bg-transparent border-none focus:ring-0"
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={sendMessage} variant="primary" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;