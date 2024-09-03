import React from 'react';
import { useThreads } from '@/hooks/useThreads';
import { Button } from '@/components/ui/button';
import { MessageSquare, PlusCircle } from 'lucide-react';

const ThreadList: React.FC<{ workspaceId: number, onSelectThread: (threadId: number) => void }> = ({ workspaceId, onSelectThread }) => {
  const { threads, createThread } = useThreads(workspaceId);

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={createThread}>
        <PlusCircle className="mr-2" size={16} />
        Nova Thread
      </Button>
      {threads.map((thread) => (
        <Button
          key={thread.id}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectThread(thread.id)}
        >
          <MessageSquare className="mr-2" size={16} />
          {thread.name}
        </Button>
      ))}
    </div>
  );
};

export default ThreadList;