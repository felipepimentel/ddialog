from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src.models import Workspace, Message
from src.schemas import MessageCreate, MessageResponse
from src.services import llm_service

router = APIRouter()

@router.post("/workspaces/{workspace_id}/messages", response_model=MessageResponse)
async def create_message(
    workspace_id: int,
    message: MessageCreate,
    db: Session = Depends(get_db)
):
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    new_message = Message(
        content=message.content,
        sender=message.sender,
        workspace_id=workspace_id
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    # If the message is from the user, generate an AI response
    if message.sender == "user":
        ai_response = await llm_service.generate_response(message.content)
        ai_message = Message(
            content=ai_response,
            sender="ai",
            workspace_id=workspace_id
        )
        db.add(ai_message)
        db.commit()
        db.refresh(ai_message)
        return MessageResponse.from_orm(ai_message)

    return MessageResponse.from_orm(new_message)