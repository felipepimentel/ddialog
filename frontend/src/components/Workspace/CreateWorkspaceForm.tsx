import React, { useState } from 'react';
import api from '@/services/api';
import { CreateWorkspaceFormProps } from './WorkspaceTypes';

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({ onWorkspaceCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/workspaces', { name, description });
      setName('');
      setDescription('');
      if (onWorkspaceCreated) {
        onWorkspaceCreated();
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">Create New Workspace</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workspace name"
          className="w-full input"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter workspace description"
          className="w-full input"
        />
        <button type="submit" className="w-full btn btn-primary">
          Create Workspace
        </button>
      </div>
    </form>
  );
};

export default CreateWorkspaceForm;