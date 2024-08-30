import React, { useState } from 'react';
import { Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import IconButton from '@/components/ui/IconButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ColorPicker from '@/components/ui/ColorPicker';

interface ChatSettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  chatColor: string;
  setChatColor: (value: string) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isDarkMode,
  setIsDarkMode,
  fontSize,
  setFontSize,
  chatColor,
  setChatColor
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <IconButton 
          icon={<Settings className="h-5 w-5" />}
          tooltip="Settings"
        />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Appearance</h4>
            <p className="text-sm text-muted-foreground">
              Customize the chat interface
            </p>
          </div>
          <div className="grid gap-2">
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div className="space-y-1">
              <label htmlFor="font-size" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Font Size
              </label>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="chat-color" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Chat Color
              </label>
              <ColorPicker
                colors={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
                selectedColor={chatColor}
                onColorChange={setChatColor}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatSettings;