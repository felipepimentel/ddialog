import React, { useState, useEffect } from 'react';
import { Workspace } from '../../types/workspace';
import api from '../../services/api';

interface WorkspaceListProps {
  onSelectWorkspace: (workspaceId: number) => void;
  selectedWorkspace: number | null;
}

const WorkspaceList: React.FC<WorkspaceListProps> = ({ onSelectWorkspace, selectedWorkspace }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await api.get('/workspaces/');
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  return (
    <div className="space-y-2">
      {workspaces.map((workspace) => (
        <button
          key={workspace.id}
          onClick={() => onSelectWorkspace(workspace.id)}
          className={`w-full text-left p-2 rounded ${
            selectedWorkspace === workspace.id
              ? 'bg-blue-100 dark:bg-blue-900'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <h3 className="font-semibold">{workspace.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{workspace.description}</p>
        </button>
      ))}
    </div>
  );
};

export default WorkspaceList;