import React, { useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronDown, Paperclip, ImageIcon, Smile, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import IconButton from '@/components/ui/IconButton';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDarkMode: boolean;
  chatColor: string;
}

const ChatInputActions: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton 
          icon={<ChevronDown className="h-5 w-5" />}
          tooltip="More options"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Command>
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Paperclip className="mr-2 h-4 w-4" />
                <span>Attach file</span>
              </CommandItem>
              <CommandItem>
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Upload image</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Choose emoji</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
        <IconButton 
          icon={<Mic className="h-5 w-5" />}
          tooltip="Voice input"
        />
        <IconButton 
          icon={<Send className="h-5 w-5" />}
          onClick={handleSendMessage}
          tooltip="Send message"
          variant="default"
          className="transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: chatColor }}
        />
      </div>
    </div>
  );
};

export default ChatInput;