from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..routers.workspaces import get_workspace_or_404
from ..database import get_db
from .. import models, schemas
from ..services import llm_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/workspaces/{workspace_id}/conversation", response_model=schemas.Conversation)
async def get_or_create_conversation(workspace_id: int, db: Session = Depends(get_db)):
    workspace = get_workspace_or_404(workspace_id, db)
    print(f"workspace: {workspace}")
    conversation = db.query(models.Conversation).filter(models.Conversation.workspace_id == workspace_id).first()
    if not conversation:
        conversation = models.Conversation(workspace_id=workspace_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
    return conversation

@router.get("/conversations/{conversation_id}/messages", response_model=list[schemas.Message])
async def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    messages = db.query(models.Message).filter(models.Message.conversation_id == conversation_id).all()
    return messages

@router.post("/workspaces/{workspace_id}/messages", response_model=schemas.Message)
async def create_message(workspace_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
    workspace = get_workspace_or_404(workspace_id, db)
    print(f"workspace: {workspace}")
    conversation = db.query(models.Conversation).filter(models.Conversation.workspace_id == workspace_id).first()
    if not conversation:
        conversation = models.Conversation(workspace_id=workspace_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    db_message = models.Message(
        content=message.content,
        sender=message.sender,
        conversation_id=conversation.id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    if message.sender == 'user':
        documents = db.query(models.Document).filter(models.Document.workspace_id == workspace_id).all()
        context = "\n".join([doc.content for doc in documents])
        ai_response = await llm_service.get_llm_response(message.content, context)

        ai_message = models.Message(
            content=ai_response,
            sender="ai",
            conversation_id=conversation.id
        )
        db.add(ai_message)
        db.commit()
        db.refresh(ai_message)
        return ai_message

    return db_message

@router.post("/workspaces/{workspace_id}/threads/{thread_id}/messages", response_model=schemas.Message)
async def create_message(
    workspace_id: int,
    thread_id: int,
    message: schemas.MessageCreate,
    db: Session = Depends(get_db)
):
    # Verificar se o workspace e a thread existem
    workspace = get_workspace_or_404(workspace_id, db)
    thread = get_thread_or_404(thread_id, db)

    # Salvar a mensagem do usuário
    user_message = models.Message(
        content=message.content,
        sender="user",
        thread_id=thread_id
    )
    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    # Realizar o processo de RAG
    relevant_docs = rag_service.retrieve_relevant_documents(message.content, workspace_id)
    
    # Gerar resposta da IA
    ai_response = await llm_service.generate_response(message.content, relevant_docs)

    # Salvar a resposta da IA
    ai_message = models.Message(
        content=ai_response,
        sender="ai",
        thread_id=thread_id
    )
    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)

    return ai_message
