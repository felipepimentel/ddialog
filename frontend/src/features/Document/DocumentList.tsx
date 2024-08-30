import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Document, DocumentListProps } from '@/features/Document/DocumentTypes';


const DocumentList: React.FC<DocumentListProps> = ({ workspaceId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, [workspaceId]);

  const fetchDocuments = async () => {
    try {
      const response = await api.get(`/workspaces/${workspaceId}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-semibold">Documents</h3>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="p-2 bg-gray-100 rounded">
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;