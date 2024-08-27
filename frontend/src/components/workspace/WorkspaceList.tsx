import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Workspace } from '../../types/workspace';
import api from '../../services/api';

const WorkspaceList: React.FC = () => {
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Workspaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            to={`/workspace/${workspace.id}`}
            className="card p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">{workspace.name}</h3>
            <p className="text-gray-600">{workspace.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceList;