import React from 'react';
import { Zap, Settings } from "lucide-react";
import IconButton from '@/components/ui/IconButton';
import ChatSettings from '@/features/Workspace/ChatSettings';

interface ChatActionsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  chatColor: string;
  setChatColor: (value: string) => void;
}

const ChatActions: React.FC<ChatActionsProps> = (props) => {
  return (
    <div className="flex space-x-2">
      <IconButton 
        icon={<Zap className="h-5 w-5" />} 
        tooltip="Quick Actions"
      />
      <ChatSettings {...props} />
    </div>
  );
};

export default ChatActions;