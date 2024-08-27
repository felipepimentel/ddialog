from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services import auth, llm_service

router = APIRouter()

@router.post("/conversations/", response_model=schemas.Conversation)
def create_conversation(
    conversation: schemas.ConversationCreate,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Check if the workspace belongs to the user
    workspace = db.query(models.Workspace).filter(models.Workspace.id == conversation.workspace_id, models.Workspace.owner_id == current_user.id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    db_conversation = models.Conversation(**conversation.dict())
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

@router.post("/conversations/{conversation_id}/messages/", response_model=schemas.Message)
async def create_message(
    conversation_id: int,
    message: schemas.MessageCreate,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Check if the conversation belongs to the user's workspace
    conversation = db.query(models.Conversation).join(models.Workspace).filter(
        models.Conversation.id == conversation_id,
        models.Workspace.owner_id == current_user.id
    ).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    db_message = models.Message(**message.dict(), conversation_id=conversation_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # Get AI response
    documents = db.query(models.Document).filter(models.Document.workspace_id == conversation.workspace_id).all()
    context = "\n".join([doc.content for doc in documents])
    ai_response = await llm_service.get_llm_response(message.content, context)

    ai_message = models.Message(content=ai_response, sender="ai", conversation_id=conversation_id)
    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)

    return ai_message

@router.get("/workspaces/{workspace_id}/messages", response_model=list[schemas.Message])
def get_messages(workspace_id: int, db: Session = Depends(get_db)):
    messages = db.query(models.Message).join(models.Conversation).filter(models.Conversation.workspace_id == workspace_id).all()
    return messages

@router.post("/workspaces/{workspace_id}/messages", response_model=schemas.Message)
async def create_message(
    workspace_id: int,
    message: schemas.MessageCreate,
    db: Session = Depends(get_db)
):
    # Check if the workspace exists
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    # Create or get the conversation for this workspace
    conversation = db.query(models.Conversation).filter(models.Conversation.workspace_id == workspace_id).first()
    if not conversation:
        conversation = models.Conversation(workspace_id=workspace_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Create the user message
    db_message = models.Message(**message.dict(), conversation_id=conversation.id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # Get AI response
    documents = db.query(models.Document).filter(models.Document.workspace_id == workspace_id).all()
    context = "\n".join([doc.content for doc in documents])
    ai_response = await llm_service.get_llm_response(message.content, context)

    # Create the AI message
    ai_message = models.Message(content=ai_response, sender="ai", conversation_id=conversation.id)
    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)

    return ai_message