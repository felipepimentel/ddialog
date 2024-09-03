import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';

const DocumentUpload: React.FC<{ workspaceId: number }> = ({ workspaceId }) => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadDocument } = useDocuments(workspaceId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadDocument(file);
      setFile(null);
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        <Upload className="mr-2" size={16} />
        Upload
      </Button>
    </div>
  );
};

export default DocumentUpload;