# DDialog

DDialog is an intelligent document-based conversation platform that enables users to have meaningful interactions with their documents using advanced Language Learning Models (LLMs) and vector databases.

## Features

- Multi-modal LLM support (both open-source and commercial)
- Workspace-based document organization
- Multi-user support with permissions
- Support for multiple document types (PDF, TXT, DOCX, etc.)
- Drag-and-drop document upload
- Clear citation and source tracking
- Cost and time-saving measures for large document management
- Developer API for custom integrations
- Cloud-deployment ready
- Support for various vector databases
- Dark/Light theme toggle with persistent user preference

## Project Structure

The project consists of two main components:

1. Frontend (React + Vite + TypeScript)
2. Backend (FastAPI + PostgreSQL)

## Prerequisites

- Docker and Docker Compose
- Make (optional, for using Makefile commands)

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ddialog.git
   cd ddialog
   ```

2. Initialize the project:
   ```
   make init
   ```
   This command will set up the environment, install dependencies, build Docker images, and start the services.

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API documentation: `http://localhost:8000/docs`

## Development

### Common Commands

- Start the application (production): `make up`
- Start the application (development): `make up-dev`
- Stop the application (production): `make down`
- Stop the application (development): `make down-dev`
- View logs: `make logs`
- Rebuild Docker images (production): `make build`
- Rebuild Docker images (development): `make build-dev`
- Stop, rebuild, and start (production): `make down-build-up`
- Stop, rebuild, and start (development): `make down-build-up-dev`
- Access frontend shell: `make shell-frontend`
- Access backend shell: `make shell-backend`
- Run backend tests: `make test-backend`

### Hot Reloading

Both frontend and backend support hot reloading. Any changes you make to the code will be reflected immediately without needing to restart the containers.

### Adding Dependencies

- Frontend: Run `pnpm add <package-name>` in the frontend container shell
- Backend: Run `poetry add <package-name>` in the backend container shell

## Testing

Run the test suite for the backend:

## Environment Setup

1. Copy the example environment file:
   ```
   make setup-env
   ```
2. Open `backend/.env` and replace the placeholder values with your actual OPENROUTER_API_KEY and database URL.