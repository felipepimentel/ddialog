import { useState, useEffect } from 'react';
import api from '@/services/api';

interface Workspace {
  id: number;
  name: string;
  // Add other workspace properties as needed
}

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/workspaces');
      setWorkspaces(response.data);
      if (response.data.length > 0 && !selectedWorkspaceId) {
        setSelectedWorkspaceId(response.data[0].id);
      }
    } catch (err) {
      setError('Failed to fetch workspaces');
      console.error('Error fetching workspaces:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { workspaces, selectedWorkspaceId, setSelectedWorkspaceId, isLoading, error };
}