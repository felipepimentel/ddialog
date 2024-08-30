export interface Workspace {
    id: number;
    name: string;
    description?: string;
}

export interface WorkspaceMenuProps {
    onSelectWorkspace: (workspaceId: number) => void;
    selectedWorkspace: number | null;
}


export interface WorkspaceHeaderProps {
    workspaceName: string;
}

export interface WorkspaceListProps {
    onSelectWorkspace: (workspaceId: number) => void;
    selectedWorkspace: number | null;
}


export interface CreateWorkspaceFormProps {
    onWorkspaceCreated?: () => void;
}

export interface CreateWorkspaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateWorkspace: (name: string, description: string) => void;
}
