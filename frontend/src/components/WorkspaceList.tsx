import React from 'react';
import { Workspace } from './Workspace';

interface WorkspaceData {
  id: string;
  name: string;
}

interface WorkspaceListProps {
  workspaces: WorkspaceData[];
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({ workspaces }) => {
  return (
    <div>
      {workspaces.map((workspace) => (
        <Workspace key={workspace.id} id={workspace.id} name={workspace.name} />
      ))}
    </div>
  );
};