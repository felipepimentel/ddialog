import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MessageItem from './MessageItem';
import { Bot, Loader2 } from "lucide-react"; 
import { MessageListProps } from '@/features/Message/MessageTypes';

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
          <Bot className="w-4 h-4 mr-2" />
          <span>AI is thinking</span>
          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
        </motion.div>
      )}
    </ScrollArea>
  );
};

export default MessageList;
