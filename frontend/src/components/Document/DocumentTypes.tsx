export interface Document {
    id: number;
    name: string;
}

export interface DocumentListProps {
    workspaceId: string;
}

export interface DocumentUploadProps {
    workspaceId: string;
    onUploadSuccess: () => void;
    children: React.ReactNode;
}