import { useState, useEffect } from 'react';
import api from '@/services/api';

export const useThreads = (workspaceId: number) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    if (workspaceId) {
      fetchThreads();
    }
  }, [workspaceId]);

  const fetchThreads = async () => {
    try {
      const response = await api.get(`/workspaces/${workspaceId}/threads`);
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  const createThread = async () => {
    try {
      const response = await api.post(`/workspaces/${workspaceId}/threads`, { name: 'New Thread' });
      setThreads([...threads, response.data]);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return { threads, createThread };
};