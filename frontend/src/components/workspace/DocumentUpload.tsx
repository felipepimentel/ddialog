import React, { useState } from 'react';
import api from '../../services/api';

interface DocumentUploadProps {
  workspaceId: string;
  onUploadSuccess?: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ workspaceId, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/workspaces/${workspaceId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <form onSubmit={handleUpload} className="mb-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        type="submit"
        disabled={!file}
        className="btn btn-primary"
      >
        Upload Document
      </button>
    </form>
  );
};

export default DocumentUpload;