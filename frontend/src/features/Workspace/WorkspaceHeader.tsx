import React from 'react';
import { Button } from '@/components/ui/button';
import { Info, MoreVertical } from 'lucide-react';

interface WorkspaceHeaderProps {
  workspaceName: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ workspaceName }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <h2 className="text-xl font-semibold">{workspaceName}</h2>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Info className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;