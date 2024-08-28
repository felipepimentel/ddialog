from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services import llm_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/workspaces/{workspace_id}/conversation", response_model=schemas.Conversation)
async def get_or_create_conversation(
    workspace_id: int,
    db: Session = Depends(get_db)
):
    try:
        # Check if the workspace exists
        workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
        if not workspace:
            logger.warning(f"Workspace not found: {workspace_id}")
            raise HTTPException(status_code=404, detail="Workspace not found")

        # Get or create the conversation for this workspace
        conversation = db.query(models.Conversation).filter(models.Conversation.workspace_id == workspace_id).first()
        if not conversation:
            conversation = models.Conversation(workspace_id=workspace_id)
            db.add(conversation)
            db.commit()
            db.refresh(conversation)
            logger.info(f"Created new conversation for workspace: {workspace_id}")
        else:
            logger.info(f"Retrieved existing conversation for workspace: {workspace_id}")

        return conversation
    except Exception as e:
        logger.error(f"Error in get_or_create_conversation: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

# Add other chat-related routes here with similar error handling and logging