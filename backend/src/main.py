from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .routers import workspaces, documents, chat
from .database import engine, Base
import logging
import os
from fastapi.responses import JSONResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS - more permissive
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Create database tables
Base.metadata.create_all(bind=engine)
logger.info("Database tables created successfully")

# Run migrations
try:
    from alembic import command
    from alembic.config import Config
    alembic_cfg = Config(os.path.join(os.path.dirname(__file__), '..', 'alembic.ini'))
    command.upgrade(alembic_cfg, "head")
    logger.info("Alembic migrations applied successfully")
except ImportError:
    logger.warning("Alembic not installed. Skipping migrations.")
except Exception as e:
    logger.error(f"Error applying Alembic migrations: {str(e)}", exc_info=True)

# Include routers
app.include_router(workspaces.router, prefix="/api/workspaces", tags=["workspaces"])
app.include_router(documents.router, prefix="/api/workspaces", tags=["documents"])
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred. Please try again later."},
    )

@app.get("/")
async def root():
    return {"message": "Welcome to DDialog API"}