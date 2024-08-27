import React, { useState } from 'react';
import api from '../../services/api';

const CreateWorkspaceForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/workspaces', { name, description });
      setName('');
      setDescription('');
      // Optionally, you can trigger a refresh of the workspace list here
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Workspace</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workspace name"
          className="input w-full"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter workspace description"
          className="input w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Workspace
        </button>
      </div>
    </form>
  );
};

export default CreateWorkspaceForm;