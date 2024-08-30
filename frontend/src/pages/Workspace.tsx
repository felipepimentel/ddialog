import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatWindow from '../features/Workspace/ChatWindow';
import DocumentList from '../features/Workspace/DocumentList';
import DocumentUpload from '../features/Workspace/DocumentUpload';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../services/api';

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState('');
  const [refreshDocuments, setRefreshDocuments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkspaceData();
  }, [id]);

  const fetchWorkspaceData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/workspaces/${id}`);
      setWorkspaceName(response.data.name);
    } catch (error) {
      console.error('Error fetching workspace data:', error);
      setError('Failed to load workspace. Please try again.');
      setTimeout(() => navigate('/'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setRefreshDocuments(prev => !prev);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6">Workspace: {workspaceName}</h1>
        <ChatWindow workspaceId={parseInt(id || '0', 10)} />
      </div>
      <div className="lg:w-1/4 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
          <DocumentUpload workspaceId={id || ''} onUploadSuccess={handleUploadSuccess}>
            Upload
          </DocumentUpload>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <DocumentList workspaceId={id || ''} key={refreshDocuments.toString()} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;