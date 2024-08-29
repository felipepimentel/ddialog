import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatActions from './ChatActions';

interface Workspace {
  id: number;
  name: string;
}

interface ChatHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  chatColor: string;
  setChatColor: (value: string) => void;
  workspaces: Workspace[];
  selectedWorkspaceId: number | null;
  setSelectedWorkspaceId: (id: number) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = (props) => {
  const { isDarkMode, workspaces, selectedWorkspaceId, setSelectedWorkspaceId } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn(
      "p-4 border-b flex justify-between items-center rounded-t-lg backdrop-blur-sm",
      isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white/50"
    )}>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">AI Assistant</h2>
          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>Always here to help</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedWorkspaceId
                ? workspaces.find((workspace) => workspace.id === selectedWorkspaceId)?.name
                : "Select workspace..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search workspace..." />
              <CommandList>
                <CommandEmpty>No workspace found.</CommandEmpty>
                <CommandGroup>
                  {workspaces.map((workspace) => (
                    <CommandItem
                      key={workspace.id}
                      value={workspace.id.toString()}
                      onSelect={(currentValue) => {
                        setSelectedWorkspaceId(Number(currentValue));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedWorkspaceId === workspace.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {workspace.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <ChatActions {...props} />
      </div>
    </div>
  );
};

export default ChatHeader;