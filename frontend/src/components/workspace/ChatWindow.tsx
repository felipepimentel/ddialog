import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import api from '@/services/api';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import LoadingSpinner from '@/components/common/LoadingSpinner'; // Assuming you have this component

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [chatColor, setChatColor] = useState('#4F46E5');

  const { workspaces, selectedWorkspaceId, setSelectedWorkspaceId, isLoading, error } = useWorkspaces();

  useEffect(() => {
    if (selectedWorkspaceId) {
      fetchConversationAndMessages();
    }
  }, [selectedWorkspaceId]);

  const fetchConversationAndMessages = async () => {
    if (!selectedWorkspaceId) return;

    try {
      const conversationResponse = await api.get(`/workspaces/${selectedWorkspaceId}/conversation`);
      const messagesResponse = await api.get(`/conversations/${conversationResponse.data.id}/messages`);
      setMessages(messagesResponse.data);
    } catch (error: any) {
      console.error('Error fetching conversation and messages:', error);
      toast({
        title: "Error",
        description: error.message || 'Failed to load conversation. Please try again.',
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim() || !selectedWorkspaceId) return;

    const userMessage = { id: Date.now(), content: inputMessage, sender: 'user' as const, timestamp: new Date().toISOString() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsAiTyping(true);

    try {
      const response = await api.post(`/workspaces/${selectedWorkspaceId}/messages`, {
        content: inputMessage,
        sender: 'user',
      });

      setIsAiTyping(false);
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsAiTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateWorkspace = () => {
    // Implement the logic to create a new workspace
    console.log("Create new workspace");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (workspaces.length === 0) {
    return <WelcomeScreen onCreateWorkspace={handleCreateWorkspace} />;
  }

  return (
    <div 
      className={cn(
        "h-full flex flex-col rounded-lg shadow-2xl transition-all duration-300 ease-in-out",
        isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"
      )}
      style={{ fontSize: `${fontSize}px` }}
    >
      <ChatHeader 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
        fontSize={fontSize}
        setFontSize={setFontSize}
        chatColor={chatColor}
        setChatColor={setChatColor}
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        setSelectedWorkspaceId={setSelectedWorkspaceId}
      />
      <MessageList 
        messages={messages} 
        isDarkMode={isDarkMode} 
        chatColor={chatColor} 
      />
      {isAiTyping && <TypingIndicator isDarkMode={isDarkMode} />}
      <ChatInput 
        onSendMessage={sendMessage} 
        isDarkMode={isDarkMode} 
        chatColor={chatColor}
      />
    </div>
  );
};

export default ChatWindow;