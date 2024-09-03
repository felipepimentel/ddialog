import { useState, useEffect } from 'react';
import api from '@/services/api';

export const useWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await api.get('/workspaces');
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const createWorkspace = async () => {
    try {
      const response = await api.post('/workspaces', { name: 'New Workspace' });
      setWorkspaces([...workspaces, response.data]);
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  return { workspaces, selectedWorkspaceId, setSelectedWorkspaceId, createWorkspace };
};