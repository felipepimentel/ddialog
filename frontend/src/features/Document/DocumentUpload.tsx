import React from 'react';
import api from '@/services/api';
import { DocumentUploadProps } from '@/features/Document/DocumentTypes';

const DocumentUpload: React.FC<DocumentUploadProps> = ({ workspaceId, onUploadSuccess, children }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      try {
        const response = await api.post(`/workspaces/${workspaceId}/documents`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onUploadSuccess();
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    }
  };

  return (
    <label className="p-2 transition-colors duration-200 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
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