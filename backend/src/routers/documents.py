from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List  # Add this import
from ..database import get_db
from .. import models, schemas
from ..services import document_processor

router = APIRouter()

@router.post("/{workspace_id}/documents", response_model=schemas.Document)
async def create_document(
    workspace_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    content = await document_processor.process_document(file)
    db_document = models.Document(name=file.filename, content=content, workspace_id=workspace_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.get("/{workspace_id}/documents", response_model=List[schemas.Document])
def read_documents(
    workspace_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    documents = db.query(models.Document).filter(
        models.Document.workspace_id == workspace_id
    ).offset(skip).limit(limit).all()
    return documents

# ... (update other routes similarly)