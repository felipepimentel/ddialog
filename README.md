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

## Project Structure

The project consists of three main components:

1. Frontend (React + Vite)
2. Backend (Node.js + Express)
3. Document Processor (Node.js + Express)

## Prerequisites

- Node.js (v14 or later)
- pnpm (v6 or later)
- Docker and Docker Compose (for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ddialog.git
   cd ddialog
   ```

2. Install dependencies for each component:
   ```
   cd frontend && pnpm install
   cd ../backend && pnpm install
   cd ../document-processor && pnpm install
   ```

3. Start the development servers:
   
   In separate terminal windows:
   ```
   # Frontend
   cd frontend && pnpm run dev

   # Backend
   cd backend && pnpm run dev

   # Document Processor
   cd document-processor && pnpm run dev
   ```

4. Access the application at `http://localhost:5173`

### Docker Deployment

1. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

2. Access the application at `http://localhost:80`

## Testing

Run the test suite for the backend: