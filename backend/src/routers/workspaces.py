from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..services import auth

router = APIRouter()

@router.post("/workspaces/", response_model=schemas.Workspace)
def create_workspace(
    workspace: schemas.WorkspaceCreate,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_workspace = models.Workspace(**workspace.dict(), owner_id=current_user.id)
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace

@router.get("/workspaces/", response_model=List[schemas.Workspace])
def read_workspaces(
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    workspaces = db.query(models.Workspace).filter(models.Workspace.owner_id == current_user.id).offset(skip).limit(limit).all()
    return workspaces

@router.get("/workspaces/{workspace_id}", response_model=schemas.Workspace)
def read_workspace(
    workspace_id: int,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id, models.Workspace.owner_id == current_user.id).first()
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace

@router.put("/workspaces/{workspace_id}", response_model=schemas.Workspace)
def update_workspace(
    workspace_id: int,
    workspace_update: schemas.WorkspaceCreate,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id, models.Workspace.owner_id == current_user.id).first()
    if db_workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    for var, value in vars(workspace_update).items():
        setattr(db_workspace, var, value) if value else None
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace

@router.delete("/workspaces/{workspace_id}", status_code=204)
def delete_workspace(
    workspace_id: int,
    current_user: schemas.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id, models.Workspace.owner_id == current_user.id).first()
    if db_workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    db.delete(db_workspace)
    db.commit()
    return {"ok": True}