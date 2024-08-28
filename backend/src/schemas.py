from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class WorkspaceBase(BaseModel):
    name: str
    description: Optional[str] = None

class WorkspaceCreate(WorkspaceBase):
    pass

class Workspace(WorkspaceBase):
    id: int

    class Config:
        orm_mode = True

class DocumentBase(BaseModel):
    name: str
    content: str

class DocumentCreate(DocumentBase):
    workspace_id: int

class Document(DocumentBase):
    id: int
    workspace_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    content: str
    sender: str

class MessageCreate(BaseModel):
    content: str
    sender: str
    conversation_id: Optional[int] = None

class Message(MessageBase):
    id: int
    conversation_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ConversationBase(BaseModel):
    workspace_id: int

class ConversationCreate(ConversationBase):
    pass

class Conversation(ConversationBase):
    id: int
    created_at: datetime
    updated_at: datetime
    messages: List[Message] = []

    class Config:
        orm_mode = True