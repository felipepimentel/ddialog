from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services.llm_service import get_llm_response

router = APIRouter()

@router.post("/chat/", response_model=str)
async def chat(message: schemas.ChatMessage, db: Session = Depends(get_db)):
    # Here you would typically process the message, retrieve relevant documents, etc.
    # For simplicity, we're just passing the message directly to the LLM
    response = await get_llm_response(message.content)
    return response