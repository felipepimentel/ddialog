from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import workspaces, documents, chat
from .database import engine, Base
import logging
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)
print("Database tables created successfully")

# Run migrations
try:
    from alembic import command
    from alembic.config import Config
    alembic_cfg = Config(os.path.join(os.path.dirname(__file__), '..', 'alembic.ini'))
    command.upgrade(alembic_cfg, "head")
    print("Alembic migrations applied successfully")
except ImportError:
    logging.warning("Alembic not installed. Skipping migrations.")
except Exception as e:
    logging.error(f"Error applying Alembic migrations: {str(e)}")

# Include routers
app.include_router(workspaces.router, prefix="/api/workspaces", tags=["workspaces"])
app.include_router(documents.router, prefix="/api/workspaces", tags=["documents"])
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Welcome to DDialog API"}