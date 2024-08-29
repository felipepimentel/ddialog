import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
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

interface Conversation {
  id: number;
  workspace_id: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ workspaceId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workspaceId) {
      fetchConversationAndMessages();
    }
  }, [workspaceId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversationAndMessages = async () => {
    try {
      setError(null);
      const conversationResponse = await api.get(`/workspaces/${workspaceId}/conversation`);
      setConversation(conversationResponse.data);
      const messagesResponse = await api.get(`/conversations/${conversationResponse.data.id}/messages`);
      setMessages(messagesResponse.data);
    } catch (error: any) {
      console.error('Error fetching conversation and messages:', error);
      setError(error.message || 'Failed to load conversation. Please try again.');
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !workspaceId) return;

    try {
      const userMessage = { id: Date.now(), content: inputMessage, sender: 'user' as const, timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputMessage('');
      setIsAiTyping(true);

      const response = await api.post(`/workspaces/${workspaceId}/messages`, {
        content: inputMessage,
        sender: 'user',
      });

      setIsAiTyping(false);
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsAiTyping(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  if (!workspaceId) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <p className="text-3xl font-bold mb-4">Welcome to DDialog</p>
        <p className="text-xl mb-8">Select a workspace to start chatting</p>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600 transition-colors">
          Create New Workspace
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <WorkspaceHeader workspaceName="Current Workspace" />
      {error && (
        <div className="bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
      <ScrollArea className="flex-grow p-4 overflow-y-auto" orientation="vertical">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-4 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } animate-fadeIn`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-white'
              } shadow-md`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 mr-2" />
                ) : (
                  <Bot className="h-4 w-4 mr-2" />
                )}
                <small className="text-xs text-gray-300">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isAiTyping && (
          <div className="flex items-center text-gray-400 animate-pulse">
            <Bot className="h-4 w-4 mr-2" />
            <span>AI is typing...</span>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2 items-end bg-gray-800 p-2 rounded-lg">
          <Button variant="ghost" className="text-gray-400 hover:text-white transition-colors">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 resize-none min-h-[40px] max-h-[200px] overflow-y-auto"
            rows={1}
          />
          <Button variant="ghost" className="text-gray-400 hover:text-white transition-colors">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={sendMessage} variant="default" className="bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;