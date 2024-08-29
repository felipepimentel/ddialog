import { useState, useCallback } from 'react';

export const useWorkspace = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState<string | null>(null);

  const updateCurrentWorkspace = useCallback(async (workspaceId: string) => {
    // Aqui você pode adicionar uma chamada à API se necessário
    // para atualizar o contexto no backend
    setCurrentWorkspace(workspaceId);
  }, []);

  return {
    currentWorkspace,
    setCurrentWorkspace: updateCurrentWorkspace,
  };
};