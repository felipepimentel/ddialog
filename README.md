# DDialog: Intelligent Document-Based Conversation Platform

DDialog is an advanced, AI-powered conversation platform that enables meaningful interactions with your documents. It leverages OpenRouter API and FastAPI to provide intelligent responses based on your document context.

## 🌟 Features

- 🧠 Integration with OpenRouter API for advanced language model capabilities
- 🗂️ Workspace-based document organization
- 💬 Real-time chat interface with AI responses
- 📄 Support for document upload and management
- 🌓 Dark/Light theme toggle
- 🎨 Customizable chat interface (font size, color)
- 🚀 Built with modern technologies: React, TypeScript, FastAPI, and PostgreSQL

## 🏗️ Project Structure

The project consists of two main components:

1. Frontend (React + TypeScript + Vite)
2. Backend (FastAPI + SQLAlchemy + PostgreSQL)

## 🚀 Quick Start

### Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ddialog.git
   cd ddialog
   ```

2. Create a `.env` file in the `backend` directory and add your OpenRouter API key:

   ```env
   OPENROUTER_API_KEY=your_api_key_here
   ```

3. Build and run the Docker containers:

   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

4. Access the application at `http://localhost:5173`

### Manual Setup

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:

   ```bash
   alembic upgrade head
   ```

4. Run the FastAPI server:

   ```bash
   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm run dev
   ```

4. Access the application at `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, you can access the API documentation at `http://localhost:8000/docs`

## 🧪 Key Components

### Backend

- `main.py`: FastAPI application setup and configuration
- `routers/chat.py`: API routes for conversation and message handling
- `models.py`: SQLAlchemy models for database tables
- `schemas.py`: Pydantic models for data validation
- `services/llm_service.py`: Handles communication with the OpenRouter API

### Frontend

- `src/features/Chat/ChatWindow.tsx`: Main component for the chat interface
- `src/features/Workspace/WorkspaceMenu.tsx`: Component for managing workspaces
- `src/services/api.ts`: Axios setup for API communication

## 📝 Usage

1. Create a workspace
2. Upload documents to the workspace
3. Start a conversation in the chat window
4. The AI will provide responses based on the uploaded documents and conversation context

## 🛠️ Development

- The project uses Alembic for database migrations
- Frontend styling is done using Tailwind CSS and Shadcn UI
- The application supports both light and dark modes
- CORS is configured for local development

## 🔧 Configuration

- Frontend configuration files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`
- Backend configuration: `.env` file for environment variables, `alembic.ini` for database migrations

## 🐳 Docker

The project includes Dockerfiles for both frontend and backend, as well as a `docker-compose.dev.yml` for easy development setup.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- OpenRouter for their API
- FastAPI team for their excellent web framework
- React team for their powerful frontend library
- Tailwind CSS for the utility-first CSS framework
- Shadcn UI for the beautiful UI components

## 📞 Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy chatting with DDialog! 🚀
