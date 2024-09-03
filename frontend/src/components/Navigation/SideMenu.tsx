import React from 'react';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { Button } from '@/components/ui/button';
import { PlusCircle, Folder, FileText } from 'lucide-react';

const SideMenu: React.FC = () => {
  const { workspaces, selectedWorkspaceId, setSelectedWorkspaceId, createWorkspace } = useWorkspaces();

  return (
    <nav className="w-64 bg-gray-100 h-screen p-4">
      <Button className="w-full mb-4" onClick={createWorkspace}>
        <PlusCircle className="mr-2" size={16} />
        Novo Workspace
      </Button>
      {workspaces.map((workspace) => (
        <div key={workspace.id} className="mb-2">
          <Button
            variant={selectedWorkspaceId === workspace.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedWorkspaceId(workspace.id)}
          >
            <Folder className="mr-2" size={16} />
            {workspace.name}
          </Button>
        </div>
      ))}
    </nav>
  );
};

export default SideMenu;