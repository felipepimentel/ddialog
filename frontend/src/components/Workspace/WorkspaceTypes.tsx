export interface Workspace {
    id: number;
    name: string;
    description?: string;
    color: string;
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


export interface SidebarProps {
    workspaces: Workspace[];
    selectedWorkspaceId: number;
    onSelectWorkspace: (id: number) => void;
    onCreateWorkspace: () => void;
    onEditWorkspace: (workspace: Workspace) => void;
    onDeleteWorkspace: (id: number) => void;
    isDarkMode: boolean;
}

