# DDialog: Intelligent Document-Based Conversation Platform

DDialog is an advanced, AI-powered conversation platform that enables meaningful interactions with your documents. It leverages OpenRouter API and FastAPI to provide intelligent responses based on your document context.

## 🌟 Features

- 🧠 Integration with OpenRouter API for advanced language model capabilities
- 🗂️ Workspace-based document organization
- 💬 Real-time chat interface with AI responses
- 📄 Support for document upload and management
- 🌓 Dark/Light theme toggle (frontend ready)

## 🏗️ Project Structure

The project consists of two main components:

1. Frontend (React + TypeScript + Vite)
2. Backend (FastAPI + SQLAlchemy + PostgreSQL)

## 🚀 Quick Start

### Using Docker (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/felipepimentel/ddialog.git
   cd ddialog
   ```

2. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

4. Access the application at `http://localhost:3000`

### Manual Setup

#### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up the database:
   ```
   alembic upgrade head
   ```

4. Run the FastAPI server:
   ```
   uvicorn src.main:app --reload
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, you can access the API documentation at `http://localhost:8000/docs`

## 🧪 Key Components

### Backend

- `llm_service.py`: Handles communication with the OpenRouter API
- `chat.py`: Contains API routes for conversation and message handling
- `schemas.py`: Defines Pydantic models for data validation

### Frontend

- `ChatWindow.tsx`: Main component for the chat interface
- `Workspace.tsx`: Component for managing workspaces and documents

## 📝 Usage

1. Create a workspace
2. Upload documents to the workspace
3. Start a conversation in the chat window
4. The AI will provide responses based on the uploaded documents and conversation context

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- OpenRouter for their API
- FastAPI team for their excellent web framework
- React team for their powerful frontend library

## 📞 Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy chatting with DDialog! 🚀