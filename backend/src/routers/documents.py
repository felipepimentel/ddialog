from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services import auth, document_processor

router = APIRouter()

@router.post("/documents/", response_model=schemas.Document)
async def create_document(
    workspace_id: int,
    file: UploadFile = File(...),
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Check if the workspace belongs to the user
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id, models.Workspace.owner_id == current_user.id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    content = await document_processor.process_document(file)
    db_document = models.Document(name=file.filename, content=content, file_type=file.content_type, workspace_id=workspace_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.get("/documents/{document_id}", response_model=schemas.Document)
def read_document(
    document_id: int,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    document = db.query(models.Document).join(models.Workspace).filter(
        models.Document.id == document_id,
        models.Workspace.owner_id == current_user.id
    ).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.get("/workspaces/{workspace_id}/documents", response_model=List[schemas.Document])
def read_documents(
    workspace_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    documents = db.query(models.Document).join(models.Workspace).filter(
        models.Document.workspace_id == workspace_id,
        models.Workspace.owner_id == current_user.id
    ).offset(skip).limit(limit).all()
    return documents

@router.delete("/documents/{document_id}", status_code=204)
def delete_document(
    document_id: int,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    document = db.query(models.Document).join(models.Workspace).filter(
        models.Document.id == document_id,
        models.Workspace.owner_id == current_user.id
    ).first()
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(document)
    db.commit()
    return {"ok": True}