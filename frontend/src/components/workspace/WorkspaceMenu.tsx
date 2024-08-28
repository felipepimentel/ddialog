import React, { useState, useEffect } from 'react';
import { Workspace } from '../../types/workspace';
import api from '../../services/api';
import CreateWorkspaceModal from './CreateWorkspaceModal';
import { PlusCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";

interface WorkspaceMenuProps {
  onSelectWorkspace: (workspaceId: number) => void;
  selectedWorkspace: number | null;
}

const WorkspaceMenu: React.FC<WorkspaceMenuProps> = ({ onSelectWorkspace, selectedWorkspace }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await api.get('/workspaces/');
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      toast({
        title: "Error",
        description: "Failed to fetch workspaces. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateWorkspace = async (name: string, description: string) => {
    try {
      const response = await api.post('/workspaces', { name, description });
      setWorkspaces([...workspaces, response.data]);
      setIsCreateModalOpen(false);
      toast({
        title: "Success",
        description: "Workspace created successfully.",
      });
    } catch (error) {
      console.error('Error creating workspace:', error);
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getColor = (id: number) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    return colors[id % colors.length];
  };

  return (
    <div className="w-20 h-full flex flex-col bg-secondary border-r border-border">
      <ScrollArea className="flex-1 w-full">
        <div className="p-2 space-y-2">
          {workspaces.map((workspace) => (
            <TooltipProvider key={workspace.id}>
              <Tooltip content={workspace.name}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onSelectWorkspace(workspace.id)}
                    variant={selectedWorkspace === workspace.id ? "secondary" : "ghost"}
                    className={`w-14 h-14 rounded-full ${getColor(workspace.id)} text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-primary transition-all`}
                  >
                    {getInitials(workspace.name)}
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 space-y-2">
        <TooltipProvider>
          <Tooltip content="Create New Workspace">
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant="outline"
                className="w-14 h-14 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <PlusCircle className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip content="Settings">
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-14 h-14 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Settings className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip content="Log Out">
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-14 h-14 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <LogOut className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>
  );
};

export default WorkspaceMenu;