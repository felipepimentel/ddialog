import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceMenu from '@/features/Workspace/WorkspaceMenu';
import ChatWindow from '@/features/Workspace/ChatWindow';
import WelcomeScreen from '@/features/Workspace/WelcomeScreen';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | null>(id ? parseInt(id, 10) : null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setSelectedWorkspace(parseInt(id, 10));
    } else {
      setSelectedWorkspace(null);
    }
  }, [id]);

  const handleCreateWorkspace = () => {
    // Implementar lógica para criar um novo workspace
    console.log("Create new workspace");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className={`md:block ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:relative z-10 h-full`}>
        <WorkspaceMenu
          onSelectWorkspace={(id) => {
            setSelectedWorkspace(id);
            setIsMobileMenuOpen(false);
          }}
          selectedWorkspace={selectedWorkspace}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="md:hidden p-4">
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {selectedWorkspace ? (
          <ChatWindow workspaceId={selectedWorkspace} />
        ) : (
          <WelcomeScreen onCreateWorkspace={handleCreateWorkspace} />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Home;