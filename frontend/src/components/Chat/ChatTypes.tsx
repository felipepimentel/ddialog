export interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isDarkMode: boolean;
    chatColor: string;
}

export interface ChatBubbleProps {
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
    isDarkMode: boolean;
    chatColor: string;
}

export interface ChatHeaderProps {
    workspaceName: string;
    workspaceId: string;
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    fontSize: number;
    setFontSize: (value: number) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    chatColor: string;
    setChatColor: (value: string) => void;
    workspaces: any[];
    selectedWorkspaceId: number | null;
    setSelectedWorkspaceId: (id: number | null) => void; // Ajuste para aceitar number | null
}

export interface ChatWindowProps {
    workspaceId: number | null;  // Adicione esta linha
}

export interface TypingIndicatorProps {
    isDarkMode: boolean;
}
