import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import MessageItem from './MessageItem';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
  chatColor: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isDarkMode, chatColor }) => {
  return (
    <ScrollArea className="flex-grow p-4 space-y-4">
      <AnimatePresence>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isDarkMode={isDarkMode}
            chatColor={chatColor}
          />
        ))}
      </AnimatePresence>
    </ScrollArea>
  );
};

export default MessageList;