// src/features/Chat/components/MessageItem.tsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import ChatBubble from '@/features/Chat/ChatBubble';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageItemProps } from '@/features/Message/MessageTypes';

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
        timestamp={message.created_at}
        isDarkMode={isDarkMode}
        chatColor={chatColor}
      />
      {message.sender === 'ai' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyMessageContent(message.id, message.content)}
                className={cn(
                  "h-6 w-6 transition-all duration-200",
                  isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                )}
              >
                {copiedMessageId === message.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  );
};

export default MessageItem;
