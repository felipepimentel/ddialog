import React from 'react';
import { useRouter } from 'next/router';
import { useWorkspace } from '../hooks/useWorkspace'; // Assumindo que temos um hook personalizado

interface WorkspaceProps {
  id: string;
  name: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({ id, name }) => {
  const router = useRouter();
  const { setCurrentWorkspace } = useWorkspace();

  const handleWorkspaceClick = async () => {
    try {
      await setCurrentWorkspace(id);
      // Navegar para a página de conversação do workspace
      router.push(`/workspace/${id}/conversation`);
    } catch (error) {
      console.error('Erro ao trocar o contexto do workspace:', error);
      // Implementar tratamento de erro adequado aqui
    }
  };

  return (
    <div 
      onClick={handleWorkspaceClick}
      className="cursor-pointer p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {name}
    </div>
  );
};