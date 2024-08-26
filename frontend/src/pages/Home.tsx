import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Workspace {
  id: number;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

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

  const handleCreateWorkspace = async () => {
    if (newWorkspaceName.trim()) {
      try {
        await api.post('/workspaces/', {
          name: newWorkspaceName,
          description: newWorkspaceDescription,
        });
        setNewWorkspaceName('');
        setNewWorkspaceDescription('');
        fetchWorkspaces();
      } catch (error) {
        console.error('Error creating workspace:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to DDialog</h1>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create New Workspace</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            className="input w-full"
          />
          <input
            type="text"
            value={newWorkspaceDescription}
            onChange={(e) => setNewWorkspaceDescription(e.target.value)}
            placeholder="Enter workspace description"
            className="input w-full"
          />
          <button
            onClick={handleCreateWorkspace}
            className="btn btn-primary w-full"
          >
            Create Workspace
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Workspaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.id}
              to={`/workspace/${workspace.id}`}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{workspace.name}</h3>
              <p className="text-gray-600">{workspace.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;