import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Paperclip, Mic, User, Bot } from 'lucide-react';
import api from '../../services/api';
import WorkspaceHeader from './WorkspaceHeader';

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
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <p className="text-3xl font-bold mb-4">Welcome to DDialog</p>
        <p className="text-xl mb-8">Select a workspace to start chatting</p>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
          Create New Workspace
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <WorkspaceHeader workspaceName="Current Workspace" />
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 mr-2" />
                ) : (
                  <Bot className="h-4 w-4 mr-2" />
                )}
                <small className="text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2 items-center bg-gray-800 p-2 rounded-lg">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
          />
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={sendMessage} variant="primary" size="icon" className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;