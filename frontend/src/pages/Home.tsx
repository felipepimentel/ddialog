import React, { useState } from 'react';
import WorkspaceMenu from '@/components/workspace/WorkspaceMenu';
import ChatWindow from '@/components/workspace/ChatWindow';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <ChatWindow workspaceId={selectedWorkspace} />
      </div>
      <Toaster />
    </div>
  );
};

export default Home;