from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
import logging
import traceback

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/", response_model=List[schemas.Workspace])
def read_workspaces(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    try:
        workspaces = db.query(models.Workspace).offset(skip).limit(limit).all()
        return workspaces
    except Exception as e:
        logger.error(f"Error fetching workspaces: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/", response_model=schemas.Workspace)
def create_workspace(
    workspace: schemas.WorkspaceCreate,
    db: Session = Depends(get_db)
):
    db_workspace = models.Workspace(**workspace.dict())
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace

@router.get("/{workspace_id}", response_model=schemas.Workspace)
def read_workspace(
    workspace_id: int,
    db: Session = Depends(get_db)
):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace