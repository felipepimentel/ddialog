import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  workspaceName: string;
  workspaceId: string;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  chatColor: string;
  setChatColor: (value: string) => void;
  workspaces: any[];
  selectedWorkspaceId: number | null;
  setSelectedWorkspaceId: (id: number | null) => void; // Ajuste para aceitar number | null
}


const ChatHeader: React.FC<ChatHeaderProps> = ({
  workspaceName = "Workspace",
  workspaceId,
  isDarkMode,
  setIsDarkMode,
  fontSize,
  setFontSize,
  isSidebarOpen,
  setIsSidebarOpen,
  chatColor,  // Adicione esta linha
  setChatColor,  // Adicione esta linha, se aplicável
}) => {
  return (
    <div className={cn(
      "p-4 border-b flex justify-between items-center backdrop-blur-sm",
      isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white/50"
    )}>
      <div className="flex items-center space-x-2">
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}
        >
          {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button> */}
        <h2 className="text-xl font-semibold flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`https://avatar.vercel.sh/${workspaceId}.png`} alt={workspaceName} />
            <AvatarFallback>{workspaceName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {workspaceName}
        </h2>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className={cn("transition-all duration-200", isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50")}>
            <Settings className="h-5 w-5" />
          </Button>
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
              <div className="flex items-center justify-between">
                <label htmlFor="dark-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Dark Mode
                </label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
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
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatHeader;
