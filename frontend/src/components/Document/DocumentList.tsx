import React, { useState } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { Button } from '@/components/ui/button';
import { FileText, Upload } from 'lucide-react';
import DocumentUpload from './DocumentUpload';

const DocumentList: React.FC<{ workspaceId: number }> = ({ workspaceId }) => {
  const { documents } = useDocuments(workspaceId);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={() => setIsUploadModalOpen(true)}>
        <Upload className="mr-2" size={16} />
        Upload Documento
      </Button>
      {documents.map((doc) => (
        <Button
          key={doc.id}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {/* Lógica para visualizar documento */}}
        >
          <FileText className="mr-2" size={16} />
          {doc.name}
        </Button>
      ))}
      {isUploadModalOpen && (
        <DocumentUpload workspaceId={workspaceId} onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
};

export default DocumentList;