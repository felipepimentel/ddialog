from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

def get_workspace_or_404(workspace_id: int, db: Session):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace

@router.get("/", response_model=List[schemas.Workspace])
def read_workspaces(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    workspaces = db.query(models.Workspace).offset(skip).limit(limit).all()
    logger.info(f"Retrieved {len(workspaces)} workspaces")
    return workspaces

@router.post("/", response_model=schemas.Workspace)
def create_workspace(workspace: schemas.WorkspaceCreate, db: Session = Depends(get_db)):
    db_workspace = models.Workspace(**workspace.dict())
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    logger.info(f"Created new workspace: {db_workspace.id}")
    return db_workspace

@router.get("/{workspace_id}", response_model=schemas.Workspace)
def read_workspace(workspace_id: int, db: Session = Depends(get_db)):
    return get_workspace_or_404(workspace_id, db)