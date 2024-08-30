import React, { useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, Paperclip, ImageIcon, Smile, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInputProps } from './ChatTypes';

const ChatInputActions: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronDown className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Paperclip className="w-4 h-4 mr-2" />
          <span>Attach file</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ImageIcon className="w-4 h-4 mr-2" />
          <span>Upload image</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Smile className="w-4 h-4 mr-2" />
          <span>Choose emoji</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isDarkMode, chatColor }) => {
  const [inputMessage, setInputMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log('Sending message:', inputMessage); // Add this line
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <TooltipProvider>
      <div className={cn(
        "p-4 border-t rounded-b-lg backdrop-blur-sm",
        isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white/50"
      )}>
        <div className={cn(
          "flex space-x-2 items-end p-2 rounded-lg",
          isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
        )}>
          <ChatInputActions />
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={cn(
              "flex-grow border-none focus:ring-0 resize-none min-h-[40px] max-h-[200px] overflow-y-auto transition-all duration-200",
              isDarkMode ? "bg-transparent text-white placeholder-gray-400" : "bg-transparent text-gray-900 placeholder-gray-500"
            )}
            rows={1}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleSendMessage}
                variant="default"
                size="icon"
                className="transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: chatColor }}
              >
                <Send className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ChatInput;