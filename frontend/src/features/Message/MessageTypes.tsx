// src/features/Chat/types/MessageTypes.ts
export interface Attachment {
    type: 'image' | 'file';
    url: string;
    name: string;
}

export interface Message {
    id: number;
    content: string;
    sender: 'user' | 'ai';
    created_at: string;
    attachments?: Attachment[];
}

export interface MessageListProps {
    messages: Message[];
    isDarkMode: boolean;
    chatColor: string;
    isAiTyping: boolean;
}


export interface MessageItemProps {
    message: Message;
    isDarkMode: boolean;
    chatColor: string;
}