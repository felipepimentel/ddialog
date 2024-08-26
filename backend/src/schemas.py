from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class WorkspaceBase(BaseModel):
    name: str
    description: Optional[str] = None

class WorkspaceCreate(WorkspaceBase):
    pass

class Workspace(WorkspaceBase):
    id: int
    owner_id: int

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

    class Config:
        orm_mode = True

class ChatMessage(BaseModel):
    content: str
    workspace_id: int