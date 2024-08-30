import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Workspace {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  workspaces: Workspace[];
  selectedWorkspaceId: string;
  onSelectWorkspace: (id: string) => void;
  onCreateWorkspace: () => void;
  onEditWorkspace: (workspace: Workspace) => void;
  onDeleteWorkspace: (id: string) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  workspaces,
  selectedWorkspaceId,
  onSelectWorkspace,
  onCreateWorkspace,
  onEditWorkspace,
  onDeleteWorkspace,
  isDarkMode,
}) => {
  return (
    <TooltipProvider>
      <div className={cn(
        "w-20 h-full flex flex-col border-r",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="p-4 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onCreateWorkspace}
                className="w-full aspect-square"
                variant="outline"
              >
                <PlusCircle className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Workspace</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ScrollArea className="flex-grow">
          {workspaces.map((workspace) => (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onSelectWorkspace(workspace.id)}
                  variant="ghost"
                  className={cn(
                    "w-full aspect-square mb-2 relative group",
                    selectedWorkspaceId === workspace.id && "bg-primary text-primary-foreground"
                  )}
                  style={{ backgroundColor: selectedWorkspaceId === workspace.id ? workspace.color : undefined }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://avatar.vercel.sh/${workspace.id}.png`} alt={workspace.name} />
                    <AvatarFallback>{workspace.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditWorkspace(workspace);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWorkspace(workspace.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{workspace.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;