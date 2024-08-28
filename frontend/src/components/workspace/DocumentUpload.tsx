import React from 'react';
import api from '../../services/api';

interface DocumentUploadProps {
  workspaceId: string;
  onUpload: (fileNames: string[]) => void;
  children: React.ReactNode;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ workspaceId, onUpload, children }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      try {
        const response = await api.post(`/workspaces/${workspaceId}/documents`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onUpload(response.data.fileNames);
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    }
  };

  return (
    <label className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
      {children}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
};

export default DocumentUpload;