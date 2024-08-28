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
        logger.info(f"Retrieved {len(workspaces)} workspaces")
        return workspaces
    except Exception as e:
        logger.error(f"Error fetching workspaces: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=schemas.Workspace)
def create_workspace(
    workspace: schemas.WorkspaceCreate,
    db: Session = Depends(get_db)
):
    try:
        db_workspace = models.Workspace(**workspace.dict())
        db.add(db_workspace)
        db.commit()
        db.refresh(db_workspace)
        logger.info(f"Created new workspace: {db_workspace.id}")
        return db_workspace
    except Exception as e:
        logger.error(f"Error creating workspace: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{workspace_id}", response_model=schemas.Workspace)
def read_workspace(
    workspace_id: int,
    db: Session = Depends(get_db)
):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace