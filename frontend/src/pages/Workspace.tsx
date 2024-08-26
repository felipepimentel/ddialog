import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

interface Document {
  id: number;
  name: string;
}

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWorkspaceData();
    fetchDocuments();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchWorkspaceData = async () => {
    try {
      const response = await api.get(`/workspaces/${id}`);
      setWorkspaceName(response.data.name);
    } catch (error) {
      console.error('Error fetching workspace data:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await api.get(`/workspaces/${id}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), content: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await api.post(`/conversations/${id}/messages/`, {
          content: input,
          sender: 'user',
        });
        const aiMessage: Message = { id: response.data.id, content: response.data.content, sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await api.post(`/documents/?workspace_id=${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        fetchDocuments();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">Workspace: {workspaceName}</h1>
        <div className="card p-4 mb-4 h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {message.content}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="input rounded-r-none"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="btn btn-primary rounded-l-none">Send</button>
        </div>
      </div>
      <div className="lg:w-64">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <ul className="card p-4 space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="text-gray-600">{doc.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workspace;