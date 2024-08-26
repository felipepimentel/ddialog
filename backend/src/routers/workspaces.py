from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.post("/workspaces/", response_model=schemas.Workspace)
def create_workspace(workspace: schemas.WorkspaceCreate, db: Session = Depends(get_db)):
    db_workspace = models.Workspace(**workspace.dict())
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace

@router.get("/workspaces/{workspace_id}", response_model=schemas.Workspace)
def read_workspace(workspace_id: int, db: Session = Depends(get_db)):
    db_workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if db_workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return db_workspace