import React, { useState } from 'react';
import WorkspaceMenu from '../components/workspace/WorkspaceMenu';
import ChatWindow from '../components/workspace/ChatWindow';
import { Toaster } from "../components/ui/toaster";

const Home: React.FC = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <WorkspaceMenu
        onSelectWorkspace={setSelectedWorkspace}
        selectedWorkspace={selectedWorkspace}
      />
      <div className="flex-grow overflow-hidden">
        <ChatWindow workspaceId={selectedWorkspace} />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;