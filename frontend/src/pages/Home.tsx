import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Workspace {
  id: string;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  useEffect(() => {
    // TODO: Fetch workspaces from the backend
    setWorkspaces([
      { id: '1', name: 'Project A', description: 'A project about AI' },
      { id: '2', name: 'Research B', description: 'Ongoing research on ML' },
    ]);
  }, []);

  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim()) {
      // TODO: Send create workspace request to backend
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        name: newWorkspaceName,
        description: 'New workspace',
      };
      setWorkspaces([...workspaces, newWorkspace]);
      setNewWorkspaceName('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center dark:text-gray-100">Welcome to DDialog</h1>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Create New Workspace</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            className="input flex-grow"
          />
          <button
            onClick={handleCreateWorkspace}
            className="btn btn-primary"
          >
            Create
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Your Workspaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.id}
              to={`/workspace/${workspace.id}`}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{workspace.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{workspace.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;