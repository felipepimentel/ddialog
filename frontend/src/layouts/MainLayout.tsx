import React, { useState } from 'react';
import SideMenu from '@/components/Navigation/SideMenu';
import ThreadList from '@/components/Thread/ThreadList';
import DocumentList from '@/components/Document/DocumentList';
import ChatWindow from '@/components/Chat/ChatWindow';
import { useWorkspaces } from '@/hooks/useWorkspaces';

const MainLayout: React.FC = () => {
  const { selectedWorkspaceId } = useWorkspaces();
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);

  return (
    <div className="flex h-screen">
      <SideMenu />
      <div className="flex-1 flex">
        <div className="w-64 bg-gray-50 p-4">
          {selectedWorkspaceId && (
            <>
              <h2 className="text-lg font-semibold mb-4">Threads</h2>
              <ThreadList workspaceId={selectedWorkspaceId} onSelectThread={setSelectedThreadId} />
              <h2 className="text-lg font-semibold my-4">Documentos</h2>
              <DocumentList workspaceId={selectedWorkspaceId} />
            </>
          )}
        </div>
        <div className="flex-1">
          {selectedThreadId ? (
            <ChatWindow threadId={selectedThreadId} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Selecione uma thread para iniciar a conversa
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;