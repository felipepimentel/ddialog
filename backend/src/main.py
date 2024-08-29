from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .routers import workspaces, documents, chat
from .database import engine, Base
import logging
import os
from fastapi.responses import JSONResponse
import time
from starlette.middleware.base import BaseHTTPMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS - more permissive
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Specify the frontend origin
    allow_credentials=False,  # Change this to False
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully")
except Exception as e:
    logger.error(f"Error creating database tables: {str(e)}", exc_info=True)

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
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])  # Fixed the prefix
app.include_router(chat.router, prefix="/api", tags=["chat"])

# Logging Middleware
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"{request.method} {request.url.path} - Status: {response.status_code} - Duration: {process_time:.4f}s")
        return response

app.add_middleware(LoggingMiddleware)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_message = str(exc)
    logger.error(f"Unhandled exception at {request.url}: {error_message}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "message": "An unexpected error occurred. Please try again later.",
            "details": error_message,
        },
    )

@app.get("/")
async def root():
    return {"message": "Welcome to DDialog API"}
