import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Fetch workspace data and initial messages
    setMessages([
      { id: '1', content: 'Welcome to your workspace!', sender: 'ai' },
    ]);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now().toString(), content: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      // TODO: Send message to backend for processing
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = { id: (Date.now() + 1).toString(), content: 'I received your message.', sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload to backend
      console.log('Uploading file:', file.name);
      setDocuments(prev => [...prev, file.name]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">Workspace {id}</h1>
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
          {documents.map((doc, index) => (
            <li key={index} className="text-gray-600">{doc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workspace;