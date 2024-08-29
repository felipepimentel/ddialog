import React from 'react';
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isDarkMode: boolean;
  chatColor: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, sender, timestamp, isDarkMode, chatColor }) => {
  return (
    <div
      className={cn(
        "p-3 rounded-lg max-w-[70%] shadow-md transition-all duration-300 hover:shadow-lg",
        sender === 'user'
          ? 'text-white'
          : isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      )}
      style={{ backgroundColor: sender === 'user' ? chatColor : undefined }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {sender === 'user' ? (
            <User className="h-4 w-4 mr-2" />
          ) : (
            <Bot className="h-4 w-4 mr-2" />
          )}
          <small className={cn("text-xs", isDarkMode ? "text-gray-300" : "text-gray-500")}>
            {new Date(timestamp).toLocaleTimeString()}
          </small>
        </div>
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default ChatBubble;