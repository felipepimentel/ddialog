import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MessageItem from './MessageItem';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  attachments?: { type: 'image' | 'file'; url: string; name: string }[];
}

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
  chatColor: string;
  isAiTyping: boolean; // Esta linha deve estar presente
}


const MessageList: React.FC<MessageListProps> = ({ messages, isDarkMode, chatColor, isAiTyping }) => {
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
      {isAiTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn("flex items-center", isDarkMode ? "text-gray-400" : "text-gray-600")}
        >
          <Bot className="h-4 w-4 mr-2" />
          <span>AI is thinking</span>
          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
        </motion.div>
      )}
    </ScrollArea>
  );
};

export default MessageList;