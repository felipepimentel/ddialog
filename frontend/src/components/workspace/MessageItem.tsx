import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import ChatBubble from './ChatBubble';
import IconButton from '@/components/ui/IconButton';

interface MessageItemProps {
  message: {
    id: number;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
  };
  isDarkMode: boolean;
  chatColor: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isDarkMode, chatColor }) => {
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const { toast } = useToast();

  const copyMessageContent = (messageId: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    toast({
      title: "Copied to clipboard",
      description: "The message content has been copied.",
    });
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start space-x-2",
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <ChatBubble
        content={message.content}
        sender={message.sender}
        timestamp={message.timestamp}
        isDarkMode={isDarkMode}
        chatColor={chatColor}
      />
      {message.sender === 'ai' && (
        <IconButton
          icon={copiedMessageId === message.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          onClick={() => copyMessageContent(message.id, message.content)}
          tooltip="Copy message"
          className={cn("h-6 w-6 transition-all duration-200", isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50")}
        />
      )}
    </motion.div>
  );
};

export default MessageItem;