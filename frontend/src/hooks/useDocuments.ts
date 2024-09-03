import { useState, useEffect } from 'react';
import api from '@/services/api';

export const useDocuments = (workspaceId: number) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (workspaceId) {
      fetchDocuments();
    }
  }, [workspaceId]);

  const fetchDocuments = async () => {
    try {
      const response = await api.get(`/workspaces/${workspaceId}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const uploadDocument = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post(`/workspaces/${workspaceId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setDocuments([...documents, response.data]);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return { documents, uploadDocument };
};